import { pgClient } from '../client/client';

// Fonction pour créer une fiche chantier
const createFicheChantier = async (data) => {
  const chantier_id = data.chantier_id;
  const columns = Object.keys(data).map(key => `"${key}"`);
  const values = Object.values(data);
  const placeholders = values.map((_, index) => `$${index + 1}`);

  const query = `
    INSERT INTO "FicheChantier" (${columns.join(', ')})
    VALUES (${placeholders.join(', ')})
    RETURNING *;
  `;

  try {
    // Insert the new FicheChantier
    const res = await pgClient.query(query, values);
    const newFicheChantier = res.rows[0];

    // Update the corresponding Chantier with the new fiche_chantier_id
    const updateQuery = `
      UPDATE "Chantier"
      SET fiche_chantier_id = $1
      WHERE id = $2
      RETURNING *;
    `;
    const updateValues = [newFicheChantier.id, chantier_id];

    const updateRes = await pgClient.query(updateQuery, updateValues);
    const updatedChantier = updateRes.rows[0];

    // Return the new FicheChantier and the updated Chantier
    return {
      newFicheChantier,
      updatedChantier
    };
  } catch (err) {
    throw err;
  }
}

// Fonction pour obtenir une fiche chantier par ID
const getFicheChantierByChantierId = async (id) => {
  const query = `
    SELECT * FROM "FicheChantier"
    WHERE chantier_id = $1;
  `;

  try {
    const res = await pgClient.query(query, [id]);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}

const getFicheChantierById = async (id) => {
  const query = `
    SELECT * FROM "FicheChantier"
    WHERE id = $1;
  `;

  try {
    const res = await pgClient.query(query, [id]);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}

// Fonction pour obtenir toutes les fiches chantier
const getAllFicheChantiers = async () => {
  const query = `
    SELECT * FROM "FicheChantier";
  `;

  try {
    const res = await pgClient.query(query);
    return res.rows;
  } catch (err) {
    throw err;
  }
}

// Fonction pour mettre à jour une fiche chantier
const updateFicheChantier = async (id, data) => {
  const updates = Object.keys(data).map((key, index) => `"${key}" = $${index + 1}`);
  const values = Object.values(data);
  values.push(id); // Add id to the end for the WHERE clause

  const query = `
    UPDATE "FicheChantier"
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

// Fonction pour supprimer une fiche chantier par ID
const deleteFicheChantierById = async (id) => {
  const query = `
    DELETE FROM "FicheChantier"
    WHERE id = $1;
  `;

  try {
    await pgClient.query(query, [id]);
  } catch (err) {
    throw err;
  }
}

export { createFicheChantier, getFicheChantierByChantierId, getFicheChantierById, getAllFicheChantiers, updateFicheChantier, deleteFicheChantierById };
