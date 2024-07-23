import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../models/user_model';

// Créer un utilisateur
const createUtilisateur = async (req, res) => {
    const { nom, prenom, email, password, role, telephone } = req.body;
    try {
      const newUser = await createUser(
        nom,
        prenom,
        email,
        password,
        role,
        telephone
      );
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

// Obtenir tous les utilisateurs
const getAllUtilisateurs = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir un utilisateur par ID
const getUtilisateurById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un utilisateur
const updateUtilisateur = async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email, password, role, isShadow, utilisateur_id, position, login_attempts, blocked_until, telephone } = req.body;
  try {
    const updatedUser = await updateUser(id, nom, prenom, email, password, role, isShadow, utilisateur_id, position, login_attempts, blocked_until, telephone);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un utilisateur
const deleteUtilisateur = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUser(id);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { createUtilisateur, getUtilisateurById, updateUtilisateur, deleteUtilisateur, getAllUtilisateurs };
