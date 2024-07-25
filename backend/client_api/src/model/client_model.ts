import { Request, Response } from "express";
import { pgClient } from "../client/client";
import redisClient from "../client/redisClient";
import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client_model = {
  async getAllCustomers(req: Request, res: Response) {
    const query = `SELECT * FROM "Customer" ORDER BY "Name" ASC;`;
    const cacheKey = "all_customers";

    try {
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        console.log("Cache hit");
        return res.json(JSON.parse(cachedData));
      } else {
        console.log("Cache miss");

        const result = await pgClient.query(query);
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(result.rows));
        res.json(result.rows);
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getCustomerById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const query = `SELECT * FROM "Customer" WHERE "Id" = $1;`;
    const cacheKey = `customer_${id}`;

    try {
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        console.log("Cache hit");
        return res.json(JSON.parse(cachedData));
      } else {
        console.log("Cache miss");

        const result = await pgClient.query(query, [id]);
        if (result.rows.length === 0) {
          return res.status(404).json({ message: "Customer not found" });
        }
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(result.rows[0]));
        res.json(result.rows[0]);
      }
    } catch (err) {
      console.error("Error fetching customer by ID:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getCustomerByName(req: Request, res: Response) {
    const name = req.params.name;
    const query = `SELECT * FROM "Customer" WHERE "Name" = $1;`;
    const cacheKey = `customer_name_${name}`;

    try {
      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        console.log("Cache hit");
        return res.json(JSON.parse(cachedData));
      } else {
        console.log("Cache miss");

        const result = await pgClient.query(query, [name]);
        if (result.rows.length === 0) {
          return res.status(404).json({ message: "Customer not found" });
        }
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(result.rows[0]));
        res.json(result.rows[0]);
      }
    } catch (err) {
      console.error("Error fetching customer by name:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getCustomersPaginated(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string, 10) || 25;
      const offset = parseInt(req.query.offset as string, 10) || 0;
      const searchQuery = (req.query.searchQuery as string) || "";
      const cacheKey = `customers_paginated_${limit}_${offset}_${searchQuery}`;

      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log("Cache hit");
        return res.json(JSON.parse(cachedData));
      } else {
        console.log("Cache miss");

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

        query += ` ORDER BY "Name" ASC LIMIT $${
          queryParams.length - 1
        } OFFSET $${queryParams.length}`;
        countQuery += `;`;

        const [customerResult, totalResult] = await Promise.all([
          pgClient.query(query, queryParams),
          pgClient.query(countQuery, countParams),
        ]);

        const totalCustomer = parseInt(totalResult.rows[0].count, 10);
        const totalPages = Math.ceil(totalCustomer / limit);

        const response = {
          totalCustomer,
          totalPages,
          customers: customerResult.rows,
        };

        await redisClient.setEx(cacheKey, 3600, JSON.stringify(response));

        return res.json(response);
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des données :", err);
      if (!res.headersSent) {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  },

  async deleteCustomerById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const query = `DELETE FROM "Customer" WHERE "Id" = $1 RETURNING *;`;
    try {
      const result = await pgClient.query(query, [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }

      // Invalidate the cache
      await redisClient.del("all_customers");
      await redisClient.del(`customer_${id}`);
      await redisClient.del(`customers_paginated_*`);

      res.json(result.rows[0]);
    } catch (err) {
      console.error("Error deleting customer by ID:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async updateCustomerById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const { name, email } = req.body;
    const query = `UPDATE "Customer" SET "Name" = $1, "Email" = $2 WHERE "Id" = $3 RETURNING *;`;
    try {
      const result = await pgClient.query(query, [name, email, id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }

      // Invalidate the cache
      await redisClient.del("all_customers");
      await redisClient.del(`customer_${id}`);
      await redisClient.del(`customers_paginated_*`);

      res.json(result.rows[0]);
    } catch (err) {
      console.error("Error updating customer by ID:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async createCustomer(req: Request, res: Response) {
    const data = req.body;

    try {
      const columns = Object.keys(data)
        .map((key) => `"${key}"`)
        .join(", ");
      const values = Object.values(data)
        .map((value, index) => `$${index + 1}`)
        .join(", ");

      const query = `INSERT INTO "Customer" (${columns}) VALUES (${values}) RETURNING *`;
      const result = await pgClient.query(query, Object.values(data));

      const newCustomer = result.rows[0];

      // Invalidate the cache
      await redisClient.del("all_customers");
      await redisClient.del(`customers_paginated_*`);

      // Écrire le nouveau client dans le fichier CSV
      const clientName = newCustomer.Name;
      const cleanedClientName = clientName.replace(/[^a-zA-Z0-9]/g, "");
      const filePath = path.join(
        __dirname,
        "success",
        `Customers_${cleanedClientName}.csv`
      );
      writeCustomerToCSV(filePath, newCustomer);

      res.status(201).json(newCustomer);
    } catch (error) {
      console.error("Failed to add customer:", error);
      const clientName = data.Name;
      const cleanedClientName = clientName.replace(/[^a-zA-Z0-9]/g, "");
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
      const lat = parseFloat(latCentral as string);
      const lon = parseFloat(lonCentral as string);
      const rayon = parseFloat(rayonM as string);

      if (isNaN(lat) || isNaN(lon) || isNaN(rayon)) {
        return res.status(400).json({ error: "Invalid parameters" });
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
      console.error("Error fetching customers within radius:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

function writeCustomerToCSV(filePath, customer) {
  const dir = path.dirname(filePath);

  // Créer le répertoire s'il n'existe pas
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }

  const columns = Object.keys(customer).join(";");
  
  const values = Object.values(customer).map((value) => {
    let outputValue = "";
    if (typeof value === 'string') {
      outputValue = value.replace(/"/g, '""');
    } else if (value === null || value === undefined) {
      outputValue = "";
    } else {
      outputValue = JSON.stringify(value).replace(/"/g, '""');
    }
    return `"${outputValue}"`;
  }).join(";");

  const dataLine = `${values}\n`;

  if (!fs.existsSync(filePath)) {
    const header = `${columns}\n`;
    fs.writeFileSync(filePath, header + dataLine, 'utf8');
  } else {
    const existingData = fs.readFileSync(filePath, 'utf8');
    const existingColumns = existingData.split('\n')[0];
    if (existingColumns === columns) {
      fs.appendFileSync(filePath, dataLine, 'utf8');
    } else {
      console.error("Column mismatch: The structure of the customer object does not match the existing file's columns.");
    }
  }
}

export { client_model };
