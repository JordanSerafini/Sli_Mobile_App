import { createChantierItem, deleteChantierItemById, getAllChantierItems, getItemsFromFicheById, updateChantierItem } from '../models/chantier_item_model';

// Create a new chantier-item relation
export const chantierItemController = {
    async createChantierItem(req, res) {
        try {
            const newChantierItem = await createChantierItem(req.body);
            res.status(201).json(newChantierItem);
        } catch (err) {
            console.error('Error creating chantier-item relation:', err);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    // Delete a chantier-item relation by ID
    async deleteChantierItemById(req, res) {
        try {
            await deleteChantierItemById(req.params.id);
            res.status(204).end();
        } catch (err) {
            console.error('Error deleting chantier-item relation:', err);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    // Get all chantier-item relations
    async getAllChantierItems(req, res) {
        try {
            const chantierItems = await getAllChantierItems();
            res.status(200).json(chantierItems);
        } catch (err) {
            console.error('Error getting all chantier-item relations:', err);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    // Get items from a fiche by ID
    async getItemsFromFicheById(req, res) {
        try {
            const items = await getItemsFromFicheById(req.params.id);
            res.status(200).json(items);
        } catch (err) {
            console.error('Error getting items from fiche:', err);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    // Update a chantier-item relation by ID
    async updateChantierItem(req, res) {
        try {
            const updatedChantierItem = await updateChantierItem(req.params.id, req.body);
            res.status(200).json(updatedChantierItem);
        } catch (err) {
            console.error('Error updating chantier-item relation:', err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    

}
