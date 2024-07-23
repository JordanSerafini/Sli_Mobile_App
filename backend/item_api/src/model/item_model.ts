import { Request, Response } from 'express';
import { pgClient } from '../client/client';
import * as fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const item_model = {
  async getAllItems(req: Request, res: Response) {
    const query = `
      SELECT * FROM "Item";
    `;
    try {
      const result = await pgClient.query(query);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getItemById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const query = `
      SELECT * FROM "Item" WHERE "Id" = $1;
    `;
    try {
      const result = await pgClient.query(query, [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getItemsPaginated(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string, 10) || 25;
      const offset = parseInt(req.query.offset as string, 10) || 0;
      const searchQuery = (req.query.searchQuery as string) || "";

      let query = `SELECT * FROM "Item"`;
      let countQuery = `SELECT COUNT(*) FROM "Item"`;
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

      query += ` ORDER BY "Caption" ASC LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length}`;
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

  async deleteItemById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const query = `
      DELETE FROM "Item" WHERE id = $1 RETURNING *;
    `;
    try {
      const result = await pgClient.query(query, [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async updateItemById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const { name, description } = req.body;
    const query = `
      UPDATE "Item" SET name = $1, description = $2 WHERE id = $3 RETURNING *;
    `;
    try {
      const result = await pgClient.query(query, [name, description, id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async createItem(req: Request, res: Response) {
    const data = req.body;

    try {
      // Transformer les clés en respectant les majuscules comme dans la base de données
      const columns = Object.keys(data)
        .map((key) => `"${key}"`)
        .join(", ");
      const values = Object.values(data)
        .map((value, index) => `$${index + 1}`)
        .join(", ");

      const query = `INSERT INTO "Item" (${columns}) VALUES (${values}) RETURNING *`;
      const result = await pgClient.query(query, Object.values(data));

      // Utiliser le nom de l'item pour générer le nom du fichier CSV
      const itemName = data.Caption; // Supposons que le nom de l'item est stocké dans la clé 'name'
      const cleanedItemName = itemName.replace(/[^a-zA-Z0-9]/g, ''); // Supprimer les caractères spéciaux pour le nom du fichier
      const filePath = path.join(
        __dirname,
        "validated",
        `Items_Validated.csv`
      );
      writeItemToCSV(filePath, data);
      res.status(201).json(result.rows[0]);

    } catch (error) {
      console.error("Failed to add item:", error);
      // En cas d'erreur, enregistrer les données dans un fichier d'erreur avec le nom de l'item
      const itemName = data.name; // Récupérer le nom de l'item
      const cleanedItemName = itemName.replace(/[^a-zA-Z0-9]/g, ''); // Supprimer les caractères spéciaux pour le nom du fichier
      const filePath = path.join(
        __dirname,
        "error",
        `Items_${cleanedItemName}.csv`
      );
      writeItemToCSV(filePath, data);
      res.status(500).send("Error adding item");
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

export { item_model };
