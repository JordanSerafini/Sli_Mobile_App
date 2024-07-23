import { pgClient } from '../client/client';

// Fonction pour créer un staff
const createStaff = async (data) => {
  const columns = Object.keys(data).map(key => `"${key}"`);
  const values = Object.values(data);
  const placeholders = values.map((_, index) => `$${index + 1}`);

  const query = `
    INSERT INTO "Staff" (${columns.join(', ')})
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

const getStaffById = async (id) => {
  const query = `
    SELECT * FROM "Staff"
    WHERE id = $1;
  `;

  try {
    const res = await pgClient.query(query, [id]);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}

const getAllStaff = async () => {
  const query = `
    SELECT * FROM "Staff";
  `;

  try {
    const res = await pgClient.query(query);
    return res.rows;
  } catch (err) {
    throw err;
  }
}

const updateStaff = async (id, data) => {
  const updates = Object.keys(data).map((key, index) => `"${key}" = $${index + 1}`);
  const values = Object.values(data);
  values.push(id); // Add id to the end for the WHERE clause

  const query = `
    UPDATE "Staff"
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

const deleteStaffById = async (id) => {
  const query = `
    DELETE FROM "Staff"
    WHERE id = $1
    RETURNING *;
  `;

  try {
    const res = await pgClient.query(query, [id]);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
}

export { createStaff, getStaffById, getAllStaff, updateStaff, deleteStaffById };
