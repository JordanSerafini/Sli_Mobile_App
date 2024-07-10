import { createFicheChantier, deleteFicheChantierById, getAllFicheChantiers, getFicheChantierByChantierId, getFicheChantierById, updateFicheChantier } from '../models/fiche_chantier_model';

// Create a new fiche chantier
export const ficheChantierController = {
  async createFicheChantier(req, res) {
    try {
      const newFicheChantier = await createFicheChantier(req.body);
      res.status(201).json(newFicheChantier);
    } catch (err) {
      console.error('Error creating fiche chantier:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getFicheChantierByChantierId(req, res) {
    try {
      const ficheChantier = await getFicheChantierByChantierId(req.params.id);
      res.status(200).json(ficheChantier);
    } catch (err) {
      console.error('Error getting fiche chantier by chantier ID:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getFicheChantierById(req, res) {
    try {
      const ficheChantier = await getFicheChantierById(req.params.id);
      res.status(200).json(ficheChantier);
    } catch (err) {
      console.error('Error getting fiche chantier by ID:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },



  async getAllFicheChantiers(req, res) {
    try {
      const fichesChantier = await getAllFicheChantiers();
      res.status(200).json(fichesChantier);
    } catch (err) {
      console.error('Error getting all fiches chantier:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async updateFicheChantier(req, res) {
    try {
      const updatedFicheChantier = await updateFicheChantier(req.params.id, req.body);
      res.status(200).json(updatedFicheChantier);
    } catch (err) {
      console.error('Error updating fiche chantier:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async deleteFicheChantierById(req, res) {
    try {
      await deleteFicheChantierById(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error('Error deleting fiche chantier by ID:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
