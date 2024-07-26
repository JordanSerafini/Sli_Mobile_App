import { pgClient } from '../client/client';
import EBPclient from '../client/ebpclient'; // Supposons que ce soit un client MSSQL

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
                ebpCustomerMap.set(customer.Name, customer);
            });

            const pgCustomerMap = new Map();
            PGcustomers.rows.forEach(customer => {
                pgCustomerMap.set(customer.Name, customer);
            });

            for (const [id, ebpCustomer] of ebpCustomerMap) {
                const pgCustomer = pgCustomerMap.get(id);

                if (!pgCustomer) {
                    // Insérer le client dans PostgreSQL
                    await pgClient.query(
                        'INSERT INTO customer (id, name, email, ...) VALUES ($1, $2, $3, ...)',
                        [ebpCustomer.id, ebpCustomer.name, ebpCustomer.email /*, ... autres champs */]
                    );
                } else if (JSON.stringify(pgCustomer) !== JSON.stringify(ebpCustomer)) {
                    // Mettre à jour le client dans PostgreSQL
                    await pgClient.query(
                        'UPDATE customer SET name = $1, email = $2, ... WHERE id = $3',
                        [ebpCustomer.name, ebpCustomer.email /*, ... autres champs */, ebpCustomer.id]
                    );
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
