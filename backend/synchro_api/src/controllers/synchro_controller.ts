import EBPclient from "../client/ebpClient";
import { pgClient } from "../client/client";

interface TableInfo {
  tableName: string;
  columns: { name: string; type: string }[];
}

const synchro_Controller = {
  getTables: async (): Promise<TableInfo[]> => {
    const query = `
      SELECT TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_TYPE = 'BASE TABLE'
    `;

    try {
      const result = await EBPclient.query(query);
      const tables: TableInfo[] = [];

      for (const record of result.recordset) {
        const tableName: string = record.TABLE_NAME;
        const columnsQuery = `
          SELECT COLUMN_NAME, DATA_TYPE
          FROM INFORMATION_SCHEMA.COLUMNS
          WHERE TABLE_NAME = '${tableName}'
        `;
        const columnsResult = await EBPclient.query(columnsQuery);
        const columns: { name: string; type: string }[] =
          columnsResult.recordset.map((column: any) => ({
            name: column.COLUMN_NAME,
            type: column.DATA_TYPE,
          }));

        tables.push({ tableName, columns });
      }

      return tables;
    } catch (error) {
      console.error("Error getting tables:", error);
      throw error;
    }
  },

  generateCreateTableScript: (tableInfo: TableInfo): string => {
    let script = `CREATE TABLE IF NOT EXISTS "${tableInfo.tableName}" (\n`;

    tableInfo.columns.forEach((column, index) => {
      let pgDataType: string;
      switch (column.type) {
        case "nvarchar":
        case "varchar":
        case "nchar":
          pgDataType = "TEXT";
          break;
        case "int":
          pgDataType = "INTEGER";
          break;
        case "varbinary":
          pgDataType = "BYTEA";
          break;
        case "uniqueidentifier":
          pgDataType = "UUID";
          break;
        case "decimal":
          pgDataType = "DECIMAL";
          break;
        case "tinyint":
          pgDataType = "SMALLINT";
          break;
        case "smallint":
          pgDataType = "SMALLINT";
          break;
        case "datetime":
          pgDataType = "TIMESTAMP";
          break;
        case "bit":
          pgDataType = "BOOLEAN";
          break;
        case "float":
          pgDataType = "REAL";
          break;
        default:
          pgDataType = "TEXT";
          throw new Error(`Type de données non géré : ${column.type}`);
      }

      script += `    "${column.name}" ${pgDataType}`;
      if (index < tableInfo.columns.length - 1) {
        script += ",";
      }
      script += "\n";
    });

    script += ");";

    return script;
  },

  createTables: async (): Promise<void> => {
    try {
      const tables = await synchro_Controller.getTables();

      for (const tableInfo of tables) {
        const createTableScript =
          synchro_Controller.generateCreateTableScript(tableInfo);
        await pgClient.query(createTableScript);
        console.log(`Table ${tableInfo.tableName} créée avec succès.`);
      }

      console.log("Toutes les tables ont été créées avec succès.");
    } catch (error) {
      console.error("Erreur lors de la création des tables:", error);
      throw error;
    }
  },

  formatValue(value: any, dataType: string): string {
    if (value === null || value === undefined) {
      return "NULL";
    }

    if (typeof value === "string") {
      value = value.replace(/'/g, "''");
    }

    switch (dataType) {
      case "nvarchar":
      case "varchar":
      case "nchar":
        return `'${value}'`;
      case "uniqueidentifier":
        return `'${value}'`;
      case "datetime":
        return `'${value.toISOString()}'`;
      case "int":
      case "decimal":
      case "tinyint":
      case "smallint":
      case "float":
      case "nchar":
        return `${value}`;
      case "bit":
        return value ? "true" : "false";
      case "varbinary":
        // Vous pouvez ajouter ici la gestion des valeurs varbinary si nécessaire
        return `'${value}'`;
      case "boolean":
        return value ? "true" : "false";
      case undefined:
        return "NULL";
      default:
        throw new Error(`Type de données non géré : ${dataType}`);
    }
  },

  generateInsertQuery: (tableInfo, rowData, existingColumns) => {
    const columns = Object.keys(rowData).filter((column) =>
      existingColumns.includes(column)
    );
    const values = columns.map((column) => {
      const value = rowData[column];
      return synchro_Controller.formatValue(
        value,
        tableInfo.columns.find((col) => col.name === column).type
      );
    });
    const quotedColumns = columns.map((column) => `"${column}"`);
    return `INSERT INTO "${tableInfo.tableName}" (${quotedColumns.join(
      ", "
    )}) VALUES (${values.join(", ")})`;
  },

  insertDataFromMSSQLToPGSQLSelect: async () => {
    try {
      const startTime = Date.now();
      const tables = await synchro_Controller.getTables();

      console.log("Début du processus d'insertion des données...");
      //const allowedTables = ["Customer", "Item", "StockDocument", "StockDocumentLine", "Address", "Supplier", "SupplierItem", "SaleDocumentLine", "Storehouse", "ScheduleEvent", "ScheduleEventType", "MaintenanceContract", "MaintenanceContractAssociatedFiles", "MaintenanceContractFamily", "MaintenanceContractPurchaseDocument"];

      const allowedTables = ["Customer" ];

      for (const tableInfo of tables) {
        if (!allowedTables.includes(tableInfo.tableName)) {
          console.log(
            `Insertion dans la table '${tableInfo.tableName}' ignorée.`
          );
          continue;
        }

        console.log(
          `Démarrage de l'insertion dans la table: ${tableInfo.tableName}`
        );

        const selectQuery = `SELECT * FROM "${tableInfo.tableName}"`;
        let result;
        try {
          result = await EBPclient.query(selectQuery);
        } catch (err) {
          console.error(
            `Erreur lors de la requête de données de la table ${tableInfo.tableName}:`,
            err
          );
          continue;
        }

        const existingColumns = await synchro_Controller.getExistingColumns(
          tableInfo.tableName
        );

        const numRows = result.recordset.length;
        let successfulInserts = 0;

        const insertQueries = result.recordset.map((rowData) =>
          synchro_Controller.generateInsertQuery(
            tableInfo,
            rowData,
            existingColumns
          )
        );

        for (const insertQuery of insertQueries) {
          try {
            await pgClient.query(insertQuery);
            successfulInserts++;
          } catch (error) {
            console.error(
              `Erreur pendant l'insertion dans la table "${tableInfo.tableName}":`,
              error
            );
            console.log(`Requête incorrecte: ${insertQuery}`);
          }
        }

        console.log(
          `Table: "${tableInfo.tableName}", Insertions réussies : ${successfulInserts} sur ${numRows}`
        );
      }

      const endTime = Date.now();
      const executionTime = endTime - startTime;
      console.log(`Temps d'exécution total : ${executionTime} ms`);
      console.log("Processus d'insertion des données terminé.");
    } catch (error) {
      console.error("Erreur globale dans le processus d'insertion :", error);
    }
  },

  getExistingColumns: async (tableName) => {
    const query = `
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = $1
    `;
    const result = await pgClient.query(query, [tableName]);
    return result.rows.map((row) => row.column_name);
  },

  dropAllTables: async () => {
    try {
      const query = `
        DO $$ DECLARE
        r RECORD;
        BEGIN
          FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
            EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
          END LOOP;
        END $$;
      `;
      await pgClient.query(query);
      console.log("Toutes les tables ont été supprimées avec succès.");
    } catch (error) {
      console.error("Erreur lors de la suppression des tables:", error);
      throw error;
    }
  },

  truncateAllTables: async () => {
    try {
      const query = `
        DO $$ DECLARE
        r RECORD;
        BEGIN
          FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
            EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' RESTART IDENTITY CASCADE';
          END LOOP;
        END $$;
      `;
      await pgClient.query(query);
      console.log("Toutes les tables ont été tronquées avec succès.");
    } catch (error) {
      console.error("Erreur lors du tronquage des tables:", error);
      throw error;
    }
  },

  truncateTable: async (tableName: string) => {
    try {
      const query = `TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE`;
      await pgClient.query(query);
      console.log(`La table ${tableName} a été tronquée avec succès.`);
    } catch (error) {
      console.error(
        `Erreur lors du tronquage de la table ${tableName}:`,
        error
      );
      throw error;
    }
  },
};

export default synchro_Controller;
