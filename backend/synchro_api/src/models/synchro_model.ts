import { pgClient } from '../client/client';
import EBPclient from '../client/ebpClient';

const getColumnNames = async (client, tableName) => {
    const result = await client.query(`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${tableName}'`);
    return result.recordset.map(row => row.COLUMN_NAME);
};

const compareCustomer = async () => {
    try {
        // Récupérer le nombre de clients dans chaque base de données
        const ebpCustomerLengthResult = await EBPclient.query('SELECT COUNT(*) as count FROM Customer');
        const pgCustomerLengthResult = await pgClient.query('SELECT COUNT(*) as count FROM customer');

        const ebpCustomerLength = ebpCustomerLengthResult.recordset[0].count;
        const pgCustomerLength = parseInt(pgCustomerLengthResult.rows[0].count, 10);

        if (ebpCustomerLength !== pgCustomerLength) {
            console.log('Number of customers differs. Synchronizing...');

            // Récupérer les clients de chaque base de données
            const EBPcustomers = await EBPclient.query('SELECT * FROM Customer');
            const PGcustomers = await pgClient.query('SELECT * FROM customer');

            const ebpCustomerMap = new Map();
            EBPcustomers.recordset.forEach(customer => {
                ebpCustomerMap.set(customer.id, customer);
            });

            const pgCustomerMap = new Map();
            PGcustomers.rows.forEach(customer => {
                pgCustomerMap.set(customer.id, customer);
            });

            const ebpColumns = await getColumnNames(EBPclient, 'Customer');
            const pgColumns = await getColumnNames(pgClient, 'customer');

            for (const [id, ebpCustomer] of ebpCustomerMap) {
                const pgCustomer = pgCustomerMap.get(id);

                if (!pgCustomer) {
                    // Insérer le client dans PostgreSQL
                    const columnNames = ebpColumns.join(', ');
                    const columnValues = ebpColumns.map(col => ebpCustomer[col]);

                    const placeholders = columnValues.map((_, i) => `$${i + 1}`).join(', ');

                    await pgClient.query(
                        `INSERT INTO "Customer" (${columnNames}) VALUES (${placeholders})`,
                        columnValues
                    );
                } else {
                    // Comparer et mettre à jour si nécessaire
                    const updates: string[] = [];
                    const values: unknown[] = [];
                    
                    ebpColumns.forEach((col, index) => {
                        if (ebpCustomer[col] !== pgCustomer[col]) {
                            updates.push(`${col} = $${index + 1}`);
                            values.push(ebpCustomer[col] as unknown);
                        }
                    });

                    if (updates.length > 0) {
                        values.push(id);
                        await pgClient.query(
                            `UPDATE "Customer" SET ${updates.join(', ')} WHERE id = $${updates.length + 1}`,
                            values
                        );
                    }
                }
            }

            console.log('Synchronization complete.');
        } else {
            console.log('Customers are in sync.');
        }
    } catch (error) {
        console.error('Error comparing and synchronizing customers:', error);
    }
};

compareCustomer();

export { compareCustomer };
