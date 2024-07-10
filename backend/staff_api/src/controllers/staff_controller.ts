import { createStaff, deleteStaffById, getAllStaff, getStaffById, updateStaff } from '../models/staff_model';

// Créer un staff
export const staff_controller = {
  
  async createStaff(req, res) {
    try {
      const newStaff = await createStaff(req.body);
      res.status(201).json(newStaff);
    } catch (err) {
      console.error('Error creating staff:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getStaffById(req, res) {
    try {
      const staff = await getStaffById(req.params.id);
      res.status(200).json(staff);
    } catch (err) {
      console.error('Error getting staff by ID:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getAllStaff(req, res) {
    try {
      const staff = await getAllStaff();
      res.status(200).json(staff);
    } catch (err) {
      console.error('Error getting all staff:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async updateStaff(req, res) {
    try {
      const updatedStaff = await updateStaff(req.params.id, req.body);
      res.status(200).json(updatedStaff);
    } catch (err) {
      console.error('Error updating staff:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async deleteStaffById(req, res) {
    try {
      await deleteStaffById(req.params.id);
      res.status(204).send();
    } catch (err) {
      console.error('Error deleting staff by ID:', err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
