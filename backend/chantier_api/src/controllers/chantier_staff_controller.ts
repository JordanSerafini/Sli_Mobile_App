import { createChantierStaff, deleteChantierStaffById, getAllChantierStaff, getChantierStaffById, updateChantierStaff } from '../models/chantier_staff_model';

// Create a new chantier-staff relation
export const chantierStaffController = {
  async createChantierStaff(req, res) {
    try {
      const newChantierStaff = await createChantierStaff(req.body);
      res.status(201).json(newChantierStaff);
    } catch (err) {
      console.error('Error creating chantier-staff relation:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getChantierStaffById(req, res) {
    try {
      const chantierStaff = await getChantierStaffById(req.params.id);
      res.status(200).json(chantierStaff);
    } catch (err) {
      console.error('Error getting chantier-staff relation by ID:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getAllChantierStaff(req, res) {
    try {
      const chantierStaff = await getAllChantierStaff();
      res.status(200).json(chantierStaff);
    } catch (err) {
      console.error('Error getting all chantier-staff relations:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async updateChantierStaff(req, res) {
    try {
      const updatedChantierStaff = await updateChantierStaff(req.params.id, req.body);
      res.status(200).json(updatedChantierStaff);
    } catch (err) {
      console.error('Error updating chantier-staff relation:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async deleteChantierStaffById(req, res) {
    try {
      await deleteChantierStaffById(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error('Error deleting chantier-staff relation by ID:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
