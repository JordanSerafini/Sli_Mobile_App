import { pgClient } from '../client/client';
import bcrypt from 'bcryptjs';

// Fonction pour créer un utilisateur
const createUser = async (nom, prenom, email, password, role, telephone = null) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO "Utilisateurs" (nom, prenom, email, password, role, telephone)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [nom, prenom, email, hashedPassword, role, telephone];
    try {
      const res = await pgClient.query(query, values);
      return res.rows[0];
    } catch (err) {
      throw err;
    }
  };

// Fonction pour obtenir un utilisateur par ID
const getUserById = async (id) => {
  const query = `
    SELECT * FROM "Utilisateurs" WHERE id = $1;
  `;
  try {
    const res = await pgClient.query(query, [id]);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

const getAllUsers = async () => {
    const query = `
        SELECT * FROM "Utilisateurs";
    `;
    try {
        const res = await pgClient.query(query);
        return res.rows;
    } catch (err) {
        throw err;
    }
}

// Fonction pour mettre à jour un utilisateur
const updateUser = async (id, nom, prenom, email, password, role, isShadow, utilisateur_id, position, login_attempts, blocked_until, telephone) => {
  const query = `
    UPDATE "Utilisateurs"
    SET nom = $1, prenom = $2, email = $3, password = $4, role = $5, isShadow = $6, utilisateur_id = $7, position = $8, login_attempts = $9, blocked_until = $10, telephone = $11
    WHERE id = $12
    RETURNING *;
  `;
  const values = [nom, prenom, email, password, role, isShadow, utilisateur_id, position, login_attempts, blocked_until, telephone, id];
  try {
    const res = await pgClient.query(query, values);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

// Fonction pour supprimer un utilisateur
const deleteUser = async (id) => {
  const query = `
    DELETE FROM "Utilisateurs" WHERE id = $1 RETURNING *;
  `;
  try {
    const res = await pgClient.query(query, [id]);
    return res.rows[0];
  } catch (err) {
    throw err;
  }
};

export { createUser, getUserById, updateUser, deleteUser, getAllUsers };