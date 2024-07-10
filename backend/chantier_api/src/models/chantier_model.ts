import { pgClient } from '../client/client';

// Fonction pour créer un chantier
const createChantier = async (data) => {
  // Extract columns and values from the provided data
  const columns = Object.keys(data).map(key => `"${key}"`);
  const values = Object.values(data);
  const placeholders = values.map((_, index) => `$${index + 1}`);

  const query = `
    INSERT INTO "Chantier" (${columns.join(', ')})
    VALUES (${placeholders.join(', ')})
    RETURNING *;
  `;

  try {
    const res = await pgClient.query(query, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

// Fonction pour obtenir un chantier par ID
const getChantierById = async (id) => {
  const query = `
    SELECT * FROM "Chantier"
    WHERE id = $1;
  `;

  try {
    const res = await pgClient.query(query, [id]);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}

// Fonction pour obtenir tous les chantiers
const getAllChantiers = async () => {
  const query = `
    SELECT * FROM "Chantier";
  `;

  try {
    const res = await pgClient.query(query);
    return res.rows;
  } catch (err) {
    throw err;
  }
}

// Fonction pour mettre à jour un chantier
const updateChantier = async (id, data) => {
  const updates = Object.keys(data).map((key, index) => `"${key}" = $${index + 1}`);
  const values = Object.values(data);
  values.push(id); // Add id to the end for the WHERE clause

  const query = `
    UPDATE "Chantier"
    SET ${updates.join(', ')}
    WHERE id = $${values.length}
    RETURNING *;
  `;

  try {
    const res = await pgClient.query(query, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}

const deleteChantierById = async (id) => {
  const query = `
    DELETE FROM "Chantier"
    WHERE id = $1;
  `;

  try {
    await pgClient.query(query, [id]);
  } catch (err) {
    throw err;
  }
}

export { createChantier, getChantierById, deleteChantierById, getAllChantiers, updateChantier };
