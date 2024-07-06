import express from "express";
import { createUtilisateur, getAllUtilisateurs, getUtilisateurById, updateUtilisateur, deleteUtilisateur } from "../controllers/user_controller";

const router = express.Router();

router.post("/utilisateur", createUtilisateur);
router.get("/utilisateurs", getAllUtilisateurs); 
router.get("/utilisateur/:id", getUtilisateurById);
router.put("/utilisateur/:id", updateUtilisateur);
router.delete("/utilisateur/:id", deleteUtilisateur);

export default router;