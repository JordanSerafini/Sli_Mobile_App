import express from "express";
import {  chantier_controller } from "../controllers/chantier_controller";

const router = express.Router();

router.get("/chantiers", chantier_controller.getAllChantiers);
router.get("/chantier/:id", chantier_controller.getChantierById);
router.post("/chantier", chantier_controller.createChantier);
router.put("/chantier/:id", chantier_controller.updateChantier);
router.delete("/chantier/:id", chantier_controller.deleteChantierById);



export default router;