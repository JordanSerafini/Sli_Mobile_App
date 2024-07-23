//import Client from "../../database/client-pool/herokuBDD";
import { pgClient } from "../../../authentification_api/src/client/client";
import { Request, Response } from "express";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

interface FailedAddress {
  Id: string | number;
  Name: string;
  Address: string;
}

// Obtenez le répertoire du fichier en cours d'exécution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CoordinateSyncController = {
  async updateAllCustomerCoordinates(req: Request, res: Response) {
    const failedAddresses: { Id: number | string; Name: string; Address: string }[] = [];

    try {
      const query = `SELECT * FROM "Customer";`;
      const result = await pgClient.query(query);
      const customers = result.rows;

      for (const customer of customers) {
        const { Id, MainInvoicingAddress_Address1, MainInvoicingAddress_Address2, MainInvoicingAddress_Address3, MainInvoicingAddress_ZipCode, MainInvoicingAddress_City, MainInvoicingAddress_State, Name } = customer;
        const addressComponents = [MainInvoicingAddress_Address1, MainInvoicingAddress_Address2, MainInvoicingAddress_Address3, MainInvoicingAddress_ZipCode, MainInvoicingAddress_City, MainInvoicingAddress_State].filter(Boolean);
        const fullAddress = addressComponents.join(', ');

        if (fullAddress) {
          const success = await geocodeAndSave(Id, fullAddress);
          if (!success) {
            failedAddresses.push({ Id, Name, Address: fullAddress });
          }
        } else {
          console.log(`Incomplete address for customer ${Name}`);
          failedAddresses.push({ Id, Name, Address: 'Incomplete address' });
        }
      }

      writeFailedAddresses(failedAddresses);
      res.send("Coordinates update process completed for all applicable customers.");
    } catch (error) {
      console.error('Error while updating customer coordinates', error);
      res.status(500).send("Error while updating customer coordinates.");
    }
  }
};

async function geocodeAndSave(customerId: string | number, address: string) {
    try {
      const params = new URLSearchParams({ format: "json", q: address });
      const geocodeResponse = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`);
  
      const data = await geocodeResponse.json();
  
      if (data && data.length > 0 && data[0].lat && data[0].lon) {
        const Lat = parseFloat(data[0].lat);
        const Lon = parseFloat(data[0].lon);
  
        if (!isNaN(Lat) && !isNaN(Lon)) {
          await pgClient.query('UPDATE "Customer" SET "Lon" = $1, "Lat" = $2 WHERE "Id" = $3', [Lon, Lat, customerId]);
          console.log(`Coordinates successfully updated for customer ID ${customerId}: Lon=${Lon}, Lat=${Lat}`);
          return true;
        } else {
          console.error(`Received invalid coordinates (NaN) for customer ID ${customerId}: ${address}`);
          return false;
        }
      } else {
        console.error(`No valid coordinates found for address: ${address}`);
        return false;
      }
    } catch (error) {
      console.error(`Error during geocoding address: ${address}`, error);
      return false;
    }
  }
  

interface FailedAddress {
  Id: number | string;
  Name: string;
  Address: string;
}

function writeFailedAddresses(failedAddresses: FailedAddress[]) {
  const filePath = path.join(__dirname, 'failedAddresses.csv');
  const header = 'Customer ID,Customer Name,Address\n';
  const data = failedAddresses.map(a => `${a.Id},"${a.Name}","${a.Address}"`).join('\n');

  fs.writeFileSync(filePath, header + data, 'utf8');
  console.log('Failed addresses have been written to failedAddresses.csv');
}

export default CoordinateSyncController;