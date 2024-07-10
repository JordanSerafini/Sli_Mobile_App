import { createChantier, deleteChantierById, getAllChantiers, getChantierById, updateChantier } from '../models/chantier_model';

// Craete a new chantier
export const chantier_controller = {
  async createChantier(req, res) {
    try {
      const newChantier = await createChantier(req.body);
      res.status(201).json(newChantier);
    } catch (err) {
      console.error('Error creating chantier:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getChantierById(req, res) {
    try {
      const chantier = await getChantierById(req.params.id);
      res.status(200).json(chantier);
    } catch (err) {
      console.error('Error getting chantier by ID:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getAllChantiers(req, res) {
    try {
      const chantiers = await getAllChantiers();
      res.status(200).json(chantiers);
    } catch (err) {
      console.error('Error getting all chantiers:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async updateChantier(req, res) {
    try {
      const updatedChantier = await updateChantier(req.params.id, req.body);
      res.status(200).json(updatedChantier);
    } catch (err) {
      console.error('Error updating chantier:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async deleteChantierById(req, res) {
    try {
      await deleteChantierById(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error('Error deleting chantier by ID:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getChantierByIdFull(req, res) {
    try {
      const chantier = await getChantierById(req.params.id);
      if (!chantier) {
        return res.status(404).json({ message: "Chantier not found" });
      }
      res.status(200).json(chantier);
    } catch (err) {
      console.error('Error getting chantier by ID:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

};
