import { pgClient } from '../client/client';

// Fonction pour créer un chantier
const createChantier = async (name, description, address, city, postal_code, country, phone, email, contact, start_date, end_date, client_id, fiche_chantier_id, calendar_id = null) => {
  const columns = ['name', 'description', 'address', 'city', 'postal_code', 'country', 'phone', 'email', 'contact', 'start_date', 'end_date', 'client_id', 'fiche_chantier_id'];
  const values = [name, description, address, city, postal_code, country, phone, email, contact, start_date, end_date, client_id, fiche_chantier_id];

  if (calendar_id !== null) {
    columns.push('calendar_id');
    values.push(calendar_id);
  }

  const query = `
    INSERT INTO "Chantier" (${columns.join(', ')})
    VALUES (${values.map((_, index) => `$${index + 1}`).join(', ')})
    RETURNING *;
  `;

  try {
    const res = await pgClient.query(query, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

export { createChantier };
