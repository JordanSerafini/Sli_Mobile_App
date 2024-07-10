import { pgClient } from '../client/client';

// Fonction pour créer une relation chantier-item
const createChantierItem = async (data) => {
  const columns = Object.keys(data).map(key => `"${key}"`);
  const values = Object.values(data);
  const placeholders = values.map((_, index) => `$${index + 1}`);

  const query = `
    INSERT INTO "Chantier_Item" (${columns.join(', ')})
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

// Fonction pour obtenir une relation chantier-item par ID
const getItemsFromFicheById = async (id) => {
  const query = `
    SELECT * FROM "Chantier_Item"
    WHERE fiche_chantier_id = $1;
  `;

  try {
    const res = await pgClient.query(query, [id]);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}

// Fonction pour obtenir toutes les relations chantier-item
const getAllChantierItems = async () => {
  const query = `
    SELECT * FROM "Chantier_Item";
  `;

  try {
    const res = await pgClient.query(query);
    return res.rows;
  } catch (err) {
    throw err;
  }
}

// Fonction pour mettre à jour une relation chantier-item
const updateChantierItem = async (id, data) => {
  const updates = Object.keys(data).map((key, index) => `"${key}" = $${index + 1}`);
  const values = Object.values(data);
  values.push(id); // Add id to the end for the WHERE clause

  const query = `
    UPDATE "Chantier_Item"
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

// Fonction pour supprimer une relation chantier-item par ID
const deleteChantierItemById = async (id) => {
  const query = `
    DELETE FROM "Chantier_Item"
    WHERE id = $1;
  `;

  try {
    await pgClient.query(query, [id]);
  } catch (err) {
    throw err;
  }
}

export { createChantierItem, getItemsFromFicheById, getAllChantierItems, updateChantierItem, deleteChantierItemById };
