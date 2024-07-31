import { Request, Response } from 'express';
import { pgClient } from '../client/client';
import * as fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stock_model = {

  async getStockPaginated(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string, 10) || 25;
      const offset = parseInt(req.query.offset as string, 10) || 0;
      const searchQuery = (req.query.searchQuery as string) || "";

      let query = `SELECT * FROM "StockDocument"`;
      let countQuery = `SELECT COUNT(*) FROM "StockDocument"`;
      let queryParams: (string | number)[] = [];
      let countParams: (string | number)[] = [];

      // Si un terme de recherche est fourni, ajustez la requête et les paramètres
      if (searchQuery) {
        query += ` WHERE "Name" ILIKE $1`;
        countQuery += ` WHERE "Name" ILIKE $1`;
        queryParams.push(`%${searchQuery}%`);
        countParams.push(`%${searchQuery}%`);
      }

      // Ajout des paramètres pour la limite et le décalage
      queryParams.push(limit);
      queryParams.push(offset);

      query += ` ORDER BY "DocumentDate" ASC LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length}`;
      countQuery += `;`;

      // Exécution des requêtes en parallèle pour plus d'efficacité
      const [itemResult, totalResult] = await Promise.all([
        pgClient.query(query, queryParams),
        pgClient.query(countQuery, countParams),
      ]);

      const totalItems = parseInt(totalResult.rows[0].count, 10);
      const totalPages = Math.ceil(totalItems / limit);

      res.json({
        totalItems,
        totalPages,
        items: itemResult.rows,
      });
    } catch (err) {
      console.error("Erreur lors de la récupération des données :", err);
      if (!res.headersSent) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  async getAllStock(req: Request, res: Response) {
    try {
      const query = `SELECT * FROM "StockDocument"`;
      const result = await pgClient.query(query);

      res.json(result.rows);
    } catch (err) {
      console.error("Erreur lors de la récupération des données :", err);
      if (!res.headersSent) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  async getAllStockDocLines(req: Request, res: Response) {
    try {
      const query = `SELECT * FROM "StockDocumentLine"`;
      const result = await pgClient.query(query);

      res.json(result.rows);
    } catch (err) {
      console.error("Erreur lors de la récupération des données :", err);
      if (!res.headersSent) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  async getAllStoreHouse(req: Request, res: Response) {
    try {
      const query = `SELECT * FROM "Storehouse"`;
      const result = await pgClient.query(query);

      res.json(result.rows);
    } catch (err) {
      console.error("Erreur lors de la récupération des données :", err);
      if (!res.headersSent) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  async getAllStockWithDetails(req: Request, res: Response) {
    try {
      const query = `
        SELECT 
          sd.*,
          sdl.*,
          sh.*
        FROM 
          "StockDocument" sd
        LEFT JOIN 
          "StockDocumentLine" sdl ON sd."Id" = sdl."DocumentId"
        LEFT JOIN 
          "Storehouse" sh ON sd."StorehouseId" = sh."Id"
      `;
      const result = await pgClient.query(query);

      // Transformer les données pour les structurer comme vous le souhaitez
      const stockDocuments = result.rows.reduce((acc: any, row: any) => {
        // Chercher l'objet StockDocument dans le tableau d'accumulation
        let stockDocument = acc.find((doc: any) => doc.Id === row.Id);
        
        // Si le document n'existe pas encore dans l'accumulation, on le crée
        if (!stockDocument) {
          stockDocument = {
            ...row,
            StockDocumentLines: [],
            Storehouse: {
              Id: row.StorehouseId,
              Name: row.StorehouseName,
            }
          };
          acc.push(stockDocument);
        }

        // Ajouter la ligne de document de stock à l'objet stockDocument
        if (row.StockMovementId) {
          stockDocument.StockDocumentLines.push({
            Id: row.StockMovementId,
            // Ajoutez d'autres champs de la ligne de document ici
          });
        }

        return acc;
      }, []);

      res.json(stockDocuments);
    } catch (err) {
      console.error("Erreur lors de la récupération des données :", err);
      if (!res.headersSent) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  async getStockWithDetailsByDocumentId(req: Request, res: Response) {
    const { DocumentId } = req.params; 
  
    try {
      const query = `
        SELECT 
          sd.*,
          sdl.*,
          sh.*
        FROM 
          "StockDocument" sd
        LEFT JOIN 
          "StockDocumentLine" sdl ON sd."Id" = sdl."DocumentId"
        LEFT JOIN 
          "Storehouse" sh ON sd."StorehouseId" = sh."Id"
        WHERE 
          sd."Id" = $1
      `;
  
      const result = await pgClient.query(query, [DocumentId]);
  
      // Transformer les données pour les structurer comme vous le souhaitez
      const stockDocuments = result.rows.reduce((acc: any, row: any) => {
        // Chercher l'objet StockDocument dans le tableau d'accumulation
        let stockDocument = acc.find((doc: any) => doc.Id === row.Id);
        
        // Si le document n'existe pas encore dans l'accumulation, on le crée
        if (!stockDocument) {
          stockDocument = {
            ...row,
            StockDocumentLines: [],
            Storehouse: {
              Id: row.StorehouseId,
              Name: row.Caption,
              Address: row.Address_Address1,
              city: row.Address_City,
              zipCode: row.Address_ZipCode,
            }
          };
          acc.push(stockDocument);
        }
  
        // Ajouter la ligne de document de stock à l'objet stockDocument
        if (row.StockMovementId) {
          stockDocument.StockDocumentLines.push({
            Id: row.StockMovementId,
            ItemId: row.ItemId,
            Description: row.DescriptionClear,
          });
        }
  
        return acc;
      }, []);
  
      res.json(stockDocuments);
    } catch (err) {
      console.error("Erreur lors de la récupération des données :", err);
      if (!res.headersSent) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

};

// Fonction pour écrire les données de l'item dans un fichier CSV
function writeItemToCSV(filePath: string, item: any): void {
  // Définir les noms des colonnes sans les entourer de guillemets
  const columns = Object.keys(item).join(";");

  // Préparer les valeurs pour le CSV, en utilisant ';' comme délimiteur
  const values = Object.values(item).map((value) => {
    let outputValue = "";

    // Gérer correctement les chaînes, les valeurs nulles ou undefined et les objets
    if (typeof value === 'string') {
      outputValue = value.replace(/"/g, '""'); // Escaper les guillemets doubles pour le format CSV
    } else if (value === null || value === undefined) {
      outputValue = "";
    } else {
      outputValue = JSON.stringify(value).replace(/"/g, '""');
    }

    return `"${outputValue}"`; // Encapsuler chaque valeur entre guillemets doubles
  }).join(";");

  // Construire une ligne de données complète pour le CSV
  const dataLine = `${values}\n`;

  // Vérifier l'existence du fichier et ajouter les données
  if (!fs.existsSync(filePath)) {
    const header = `${columns}\n`; // Ajouter l'en-tête si le fichier est nouveau
    fs.writeFileSync(filePath, header + dataLine, 'utf8');
  } else {
    fs.appendFileSync(filePath, dataLine, 'utf8');
  }
}

export { stock_model };
