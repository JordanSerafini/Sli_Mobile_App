import { Chantier } from '../@types/chantier';
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

// Fonction pour obtenir un chantier par ID avec les relations associées


const getChantierByIdFull = async (id) => {
  const query = `
    SELECT 
      c.*,
      fc.id AS fiche_chantier_id,
      fc.name AS fiche_chantier_name,
      fc.description AS fiche_chantier_description,
      fc.project_supervision,
      fc.project_manager_id,
      fc.chantier_id,
      cs.id AS chantier_staff_id,
      cs.FicheChantier_id AS chantier_staff_fiche_chantier_id,
      cs.staff_id,
      cs.grade,
      ci.id AS chantier_item_id,
      ci.quantity,
      ci.item_id,
      ci.fiche_chantier_id AS chantier_item_fiche_chantier_id
    FROM "Chantier" c
    LEFT JOIN "FicheChantier" fc ON fc.chantier_id = c.id
    LEFT JOIN "Chantier_Staff" cs ON cs.FicheChantier_id = fc.id
    LEFT JOIN "Chantier_Item" ci ON ci.fiche_chantier_id = fc.id
    WHERE c.id = $1;
  `;

  try {
    const res = await pgClient.query(query, [id]);
    if (res.rows.length === 0) {
      return null;
    }

    const chantier: Chantier = {
      id: res.rows[0].id,
      name: res.rows[0].name,
      description: res.rows[0].description,
      address: res.rows[0].address,
      city: res.rows[0].city,
      postal_code: res.rows[0].postal_code,
      country: res.rows[0].country,
      phone: res.rows[0].phone,
      email: res.rows[0].email,
      contact: res.rows[0].contact,
      start_date: res.rows[0].start_date,
      end_date: res.rows[0].end_date,
      client_id: res.rows[0].client_id,
      calendar_id: res.rows[0].calendar_id,
      fiche_chantier_id: res.rows[0].fiche_chantier_id,
      ficheChantiers: [],
      staff: [],
      items: []
    };

    res.rows.forEach(row => {
      if (row.fiche_chantier_id) {
        chantier.ficheChantiers.push({
          id: row.fiche_chantier_id,
          name: row.fiche_chantier_name,
          description: row.fiche_chantier_description,
          project_supervision: row.project_supervision,
          project_manager_id: row.project_manager_id,
          chantier_id: row.chantier_id
        });
      }

      if (row.chantier_staff_id) {
        chantier.staff.push({
          id: row.chantier_staff_id,
          FicheChantier_id: row.chantier_staff_fiche_chantier_id,
          staff_id: row.staff_id,
          grade: row.grade
        });
      }

      if (row.chantier_item_id) {
        chantier.items.push({
          id: row.chantier_item_id,
          quantity: row.quantity,
          item_id: row.item_id,
          fiche_chantier_id: row.chantier_item_fiche_chantier_id
        });
      }
    });

    return chantier;
  } catch (err) {
    throw err;
  }
}

export { createChantier, getChantierById, deleteChantierById, getAllChantiers, updateChantier };
