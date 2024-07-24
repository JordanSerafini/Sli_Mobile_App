import { Request, Response } from "express";
import { pgClient } from "../client/client";
import * as fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const client_model = {
  async getAllCustomers(req: Request, res: Response) {
    const query = `SELECT * FROM "Customer" ORDER BY "Name" ASC;`;
    try {
      const result = await pgClient.query(query);
      res.json(result.rows);
    } catch (err) {
      console.error('Error fetching customers:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getCustomerById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const query = `SELECT * FROM "Customer" WHERE "Id" = $1;`;
    try {
      const result = await pgClient.query(query, [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error fetching customer by ID:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getCustomerByName(req: Request, res: Response) {
    const name = req.params.name;
    const query = `SELECT * FROM "Customer" WHERE "Name" = $1;`;
    try {
      const result = await pgClient.query(query, [name]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error fetching customer by name:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getCustomersPaginated(req: Request, res: Response) {
    console.log(req.query);
    try {
      const limit = parseInt(req.query.limit as string, 10) || 25;
      const offset = parseInt(req.query.offset as string, 10) || 0;
      const searchQuery = (req.query.searchQuery as string) || "";
  
  
      let query = `SELECT * FROM "Customer"`;
      let countQuery = `SELECT COUNT(*) FROM "Customer"`;
      let queryParams: (string | number)[] = [];
      let countParams: (string | number)[] = [];
  
      if (searchQuery) {
        query += ` WHERE "Name" ILIKE $1`;
        countQuery += ` WHERE "Name" ILIKE $1`;
        queryParams.push(`%${searchQuery}%`);
        countParams.push(`%${searchQuery}%`);
      }
  
      queryParams.push(limit);
      queryParams.push(offset);
  
      query += ` ORDER BY "Name" ASC LIMIT $${queryParams.length - 1} OFFSET $${queryParams.length}`;
      countQuery += `;`;
  
      console.log(`Query: ${query}, Query Params: ${queryParams}`);
  
      const [customerResult, totalResult] = await Promise.all([
        pgClient.query(query, queryParams),
        pgClient.query(countQuery, countParams),
      ]);
  
      const totalCustomer = parseInt(totalResult.rows[0].count, 10);
      const totalPages = Math.ceil(totalCustomer / limit);
  
      res.json({
        totalCustomer,
        totalPages,
        customers: customerResult.rows,
      });
    } catch (err) {
      console.error("Erreur lors de la récupération des données :", err);
      if (!res.headersSent) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  async deleteCustomerById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const query = `DELETE FROM "Customer" WHERE id = $1 RETURNING *;`;
    try {
      const result = await pgClient.query(query, [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error deleting customer by ID:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async updateCustomerById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const { name, email } = req.body;
    const query = `UPDATE "Customer" SET name = $1, email = $2 WHERE id = $3 RETURNING *;`;
    try {
      const result = await pgClient.query(query, [name, email, id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error updating customer by ID:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },


  async createCustomer(req: Request, res: Response) {
    const data = req.body;

    try {
        // Transformer les clés en respectant les majuscules comme dans la base de données
        const columns = Object.keys(data)
            .map((key) => `"${key}"`)
            .join(", ");
        const values = Object.values(data)
            .map((value, index) => `$${index + 1}`)
            .join(", ");

        const query = `INSERT INTO "Customer" (${columns}) VALUES (${values})`;
        await pgClient.query(query, Object.values(data));

        // Utiliser le nom du client pour générer le nom du fichier CSV
        const clientName = data.Name; // Supposons que le nom du client est stocké dans la clé 'Name'
        const cleanedClientName = clientName.replace(/[^a-zA-Z0-9]/g, ''); // Supprimer les caractères spéciaux pour le nom du fichier
        const filePath = path.join(
            __dirname,
            "validated",
            `Customers_Validated.csv`
        );
        writeCustomerToCSV(filePath, data);
        res.status(201).send("Customer added successfully");

    } catch (error) {
        console.error("Failed to add customer:", error);
        // En cas d'erreur, enregistrer les données dans un fichier d'erreur avec le nom du client
        const clientName = data.Name; // Récupérer le nom du client
        const cleanedClientName = clientName.replace(/[^a-zA-Z0-9]/g, ''); // Supprimer les caractères spéciaux pour le nom du fichier
        const filePath = path.join(
            __dirname,
            "error",
            `Customers_${cleanedClientName}.csv`
        );
        writeCustomerToCSV(filePath, data);
        res.status(500).send("Error adding customer");
    }
  },

  async getCustomersWithinRadius(req: Request, res: Response) {
    const { latCentral, lonCentral, rayonM } = req.query;
  
    try {
      // Convertir les paramètres en nombres
      const lat = parseFloat(latCentral as string);
      const lon = parseFloat(lonCentral as string);
      const rayon = parseFloat(rayonM as string);
  
      if (isNaN(lat) || isNaN(lon) || isNaN(rayon)) {
        return res.status(400).json({ error: 'Invalid parameters' });
      }
  
      const query = `
        SELECT *
        FROM (
          SELECT *,
                 (6371000 * acos(cos(radians($1)) * cos(radians("Lat")) * cos(radians("Lon") - radians($2)) + sin(radians($1)) * sin(radians("Lat")))) AS distance
          FROM "Customer"
        ) AS subquery
        WHERE distance < $3;
      `;
      const values = [lat, lon, rayon];
      const result = await pgClient.query(query, values);
      return res.status(200).json(result.rows);
    } catch (err) {
      console.error('Error fetching customers within radius:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

 
};


//? Fonction écriture CSV
function writeCustomerToCSV(filePath: string, customer: any): void {
    // Définir les noms des colonnes sans les entourer de guillemets
    const columns = Object.keys(customer).join(";");
  
    // Préparer les valeurs pour le CSV, en utilisant ';' comme délimiteur
    const values = Object.values(customer).map((value) => {
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

export { client_model };
