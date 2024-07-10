import { createChantier } from '../models/chantier_model';

// Créer un chantier
export const chantier_controller = {
  async createChantier(req, res) {
    const { name, description, address, city, postal_code, country, phone, email, contact, start_date, end_date, client_id, fiche_chantier_id, calendar_id } = req.body;

    try {
      const newChantier = await createChantier(
        name, description, address, city, postal_code, country, phone, email, contact, start_date, end_date, client_id, fiche_chantier_id, calendar_id
      );
      res.status(201).json(newChantier);
    } catch (err) {
      console.error('Error creating chantier:', err);
      res.status(500).json({ error: 'Failed to create chantier' });
    }
  }
};
