import { pgClient } from '../client/client';

// Fonction pour créer une relation chantier-staff
const createChantierStaff = async (data) => {
  const columns = Object.keys(data).map(key => `"${key}"`);
  const values = Object.values(data);
  const placeholders = values.map((_, index) => `$${index + 1}`);

  const query = `
    INSERT INTO "Chantier_Staff" (${columns.join(', ')})
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

// Fonction pour obtenir une relation chantier-staff par ID
const getChantierStaffById = async (id) => {
  const query = `
    SELECT * FROM "Chantier_Staff"
    WHERE id = $1;
  `;

  try {
    const res = await pgClient.query(query, [id]);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}

// Fonction pour obtenir toutes les relations chantier-staff
const getAllChantierStaff = async () => {
  const query = `
    SELECT * FROM "Chantier_Staff";
  `;

  try {
    const res = await pgClient.query(query);
    return res.rows;
  } catch (err) {
    throw err;
  }
}

// Fonction pour mettre à jour une relation chantier-staff
const updateChantierStaff = async (id, data) => {
  const updates = Object.keys(data).map((key, index) => `"${key}" = $${index + 1}`);
  const values = Object.values(data);
  values.push(id); // Add id to the end for the WHERE clause

  const query = `
    UPDATE "Chantier_Staff"
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

// Fonction pour supprimer une relation chantier-staff par ID
const deleteChantierStaffById = async (id) => {
  const query = `
    DELETE FROM "Chantier_Staff"
    WHERE id = $1;
  `;

  try {
    await pgClient.query(query, [id]);
  } catch (err) {
    throw err;
  }
}

export { createChantierStaff, getChantierStaffById, getAllChantierStaff, updateChantierStaff, deleteChantierStaffById };
