import EBPclient from "../client/ebpClient";
import { pgClient } from "../client/client";

interface TableInfo {
  tableName: string;
  columns: { name: string; type: string }[];
}

const synchro_Controller = {
  //* Récupérer les tables de la base de données MSSQL ainsi que leur colonne et type de données
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

  //* Générer un script SQL pour créer une table PostgreSQL à partir des informations de la table MSSQL

  generateCreateTableScript: (tableInfo: TableInfo): string => {
    let script = `CREATE TABLE IF NOT EXISTS "${tableInfo.tableName}" (\n`;

    tableInfo.columns.forEach((column, index) => {
      // Convertir le type de données MSSQL en type de données PostgreSQL
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

      // Ajouter la déclaration de colonne au script
      script += `    "${column.name}" ${pgDataType}`;

      // Ajouter une virgule si ce n'est pas la dernière colonne
      if (index < tableInfo.columns.length - 1) {
        script += ",";
      }

      script += "\n";
    });

    // Fermer la déclaration de la table
    script += ");";

    return script;
  },

  //* Créer des tables PostgreSQL à partir des tables MSSQL
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
    // Gérer le format des valeurs en fonction du type de données
    if (value === null || value === undefined) {
        return "NULL";
    }

    if (typeof value === "string") {
        // Échapper les apostrophes pour les chaînes
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
            // Format de date ISO8601
            return `'${value.toISOString()}'`;
        case "int":
        case "decimal":
        case "tinyint":
        case "smallint":
        case "float":
        case "nchar":
            return `${value}`;
        case "varbinary":
            // Gestion du varbinary comme précédemment
        case "boolean":
            return value ? 'true' : 'false';
        case undefined:
            return "NULL"; // Gérer le cas où le type de données est indéfini
        default:
            throw new Error(`Type de données non géré : ${dataType}`);
    }
},

  // Génération de la requête d'insertion
  generateInsertQuery: (tableInfo: any, rowData: any) => {
    // Utilisation des guillemets pour les noms des colonnes pour respecter la casse
    const columnNames = Object.keys(rowData).map(col => `"${col}"`).join(", ");
    const values = Object.values(rowData)
      .map((value, index) => {
        // Utilisation de l'index pour accéder au type de données correct depuis tableInfo.columns
        const dataType = tableInfo.columns[index].type;
        if (value instanceof Date) {
          // Formatage de la date en chaîne ISO 8601
          return synchro_Controller.formatValue(value, 'datetime');
        } else if (typeof value === "string") {
          // Échappement des apostrophes pour les chaînes
          const sanitizedValue = value.replace(/'/g, "''"); // Doubler les apostrophes existants
          return synchro_Controller.formatValue(sanitizedValue, 'nvarchar');
        } else if (value === null || value === undefined) {
          // Gestion correcte des valeurs NULL
          return "NULL";
        } else if (typeof value === "boolean") {
          // Convertir les valeurs booléennes en type boolean/integer pour PostgreSQL
          const booleanValue = value ? 'true' : 'false';
          return synchro_Controller.formatValue(booleanValue, 'boolean');
        } else {
          // Utilisation de la fonction formatValue pour les autres types de données
          return synchro_Controller.formatValue(value, dataType);
        }
      })
      .join(", ");

    // Utilisation des guillemets pour le nom de la table pour respecter la casse
    return `INSERT INTO "${tableInfo.tableName}" (${columnNames}) VALUES (${values});`;
},

generateInsertQuery2: (tableInfo: any, rowData: any) => {
  const columnNames = Object.keys(rowData).join(", ");
  const values = Object.values(rowData)
    .map((value) => {
      if (value instanceof Date) {
        // Formatage de la date en chaîne ISO 8601
        return synchro_Controller.formatValue(value, 'datetime');
      } else if (typeof value === "string") {
        // Échappement des apostrophes pour les chaînes
        const sanitizedValue = value.replace(/'/g, "''"); // Doubler les apostrophes existants
        return synchro_Controller.formatValue(sanitizedValue, 'nvarchar');
      } else if (value === null || value === undefined) {
        // Gestion correcte des valeurs NULL
        return "NULL";
      } else if (typeof value === "boolean") {
        // Convertir les valeurs booléennes en type boolean/integer pour PostgreSQL
        const booleanValue = value ? 'true' : 'false';
        return synchro_Controller.formatValue(booleanValue, 'boolean');
      } else {
        // Utilisation de la fonction formatValue pour les autres types de données
        return synchro_Controller.formatValue(value, tableInfo.dataType);
      }
    })
    .join(", ");

  return `INSERT INTO ${tableInfo.tableName} (${columnNames}) VALUES (${values});`;
},

  // Fonction pour insérer les données de MSSQL à PostgreSQL
  insertDataFromMSSQLToPGSQL: async () => {
    try {
        const startTime = Date.now();
        const tables = await synchro_Controller.getTables();

        // Début de l'opération d'insertion
        console.log("Début du processus d'insertion des données...");

        for (const tableInfo of tables) {
          if (tableInfo.tableName === "EventLog" || tableInfo.tableName === "EbpSysAsynchronousLog" || tableInfo.tableName == "EbpSysReport" || tableInfo.tableName == "EbpSysDeletedRecord" || tableInfo.tableName == "" || tableInfo.tableName == "") {
            console.log("Insertion dans la table 'EventLog' ignorée.");
            continue;  // Passer à la table suivante sans traiter 'EventLog'
        }
            // Log pour démarrer l'insertion de chaque table
            console.log(`Démarrage de l'insertion dans la table: ${tableInfo.tableName}`);

            const selectQuery = `SELECT * FROM ${tableInfo.tableName}`;
            let result;
            try {
                result = await EBPclient.query(selectQuery);
            } catch (err) {
                console.error(`Erreur lors de la requête de données de la table ${tableInfo.tableName}:`, err);
                continue; // Si la requête échoue, passer à la table suivante
            }
            
            const numRows = result.recordset.length;
            let successfulInserts = 0;

            const insertQueries = result.recordset.map(rowData =>
                synchro_Controller.generateInsertQuery(tableInfo, rowData)
            );

            for (const insertQuery of insertQueries) {
                try {
                    await pgClient.query(insertQuery);
                    successfulInserts++; // Incrémenter le compteur d'insertions réussies
                } catch (error) {
                    console.error(`Erreur pendant l'insertion dans la table "${tableInfo.tableName}":`, error);
                    console.log(`Requête incorrecte: ${insertQuery}`);
                    // Continue avec le prochain insertQuery en cas d'erreur
                }
            }

            // Log pour montrer le succès des insertions pour chaque table
            console.log(`Table: "${tableInfo.tableName}", Insertions réussies : ${successfulInserts} sur ${numRows}`);
        }

        const endTime = Date.now();
        const executionTime = endTime - startTime;
        console.log(`Temps d'exécution total : ${executionTime} ms`);
        console.log("Processus d'insertion des données terminé.");

    } catch (error) {
        console.error("Erreur globale dans le processus d'insertion :", error);
    }
},

insertDataFromMSSQLToPGSQLSelect: async () => {
  try {
      const startTime = Date.now();
      const tables = await synchro_Controller.getTables();

      // Début de l'opération d'insertion
      console.log("Début du processus d'insertion des données...");

      // Définir les tables à traiter
      //const allowedTables = ["Customer", "Item", "StockDocument", "StockDocumentLine", "Address", "Supplier","SupplierItem", "SaleDocumentLine", "Storehouse", "ScheduleEvent", , "ScheduleEventType","MaintenanceContract", "MaintenanceContractAssociatedFiles", "MaintenanceContractFamily", "MaintenanceContractPurchaseDocument" ];
      const allowedTables = [ "Customer", "Item", "StockDocument", "StockDocumentLine", "Address", "Supplier","SupplierItem", "SaleDocumentLine", "Storehouse", "ScheduleEvent", , "ScheduleEventType","MaintenanceContract", "MaintenanceContractAssociatedFiles", "MaintenanceContractFamily", "MaintenanceContractPurchaseDocument" ];


      for (const tableInfo of tables) {
          // Continuer uniquement si le nom de la table est dans la liste autorisée
          if (!allowedTables.includes(tableInfo.tableName)) {
              console.log(`Insertion dans la table '${tableInfo.tableName}' ignorée.`);
              continue;
          }

          // Log pour démarrer l'insertion de chaque table autorisée
          console.log(`Démarrage de l'insertion dans la table: ${tableInfo.tableName}`);

          const selectQuery = `SELECT * FROM ${tableInfo.tableName}`;
          let result;
          try {
              result = await EBPclient.query(selectQuery);
          } catch (err) {
              console.error(`Erreur lors de la requête de données de la table ${tableInfo.tableName}:`, err);
              continue; // Si la requête échoue, passer à la table suivante
          }
          
          const numRows = result.recordset.length;
          let successfulInserts = 0;

          const insertQueries = result.recordset.map(rowData =>
              synchro_Controller.generateInsertQuery(tableInfo, rowData)
          );

          for (const insertQuery of insertQueries) {
              try {
                  await pgClient.query(insertQuery);
                  successfulInserts++; // Incrémenter le compteur d'insertions réussies
              } catch (error) {
                  console.error(`Erreur pendant l'insertion dans la table "${tableInfo.tableName}":`, error);
                  console.log(`Requête incorrecte: ${insertQuery}`);
                  // Continue avec le prochain insertQuery en cas d'erreur
              }
          }

          // Log pour montrer le succès des insertions pour chaque table
          console.log(`Table: "${tableInfo.tableName}", Insertions réussies : ${successfulInserts} sur ${numRows}`);
      }

      const endTime = Date.now();
      const executionTime = endTime - startTime;
      console.log(`Temps d'exécution total : ${executionTime} ms`);
      console.log("Processus d'insertion des données terminé.");

  } catch (error) {
      console.error("Erreur globale dans le processus d'insertion :", error);
  }
},








}

export default synchro_Controller;