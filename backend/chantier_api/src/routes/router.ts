import express from "express";
import {  chantier_controller } from "../controllers/chantier_controller";
import { ficheChantierController } from "../controllers/fiche_chantier_controller";
import { chantierItemController } from "../controllers/chantier_item_controller";
import { chantierStaffController } from "../controllers/chantier_staff_controller";

const router = express.Router();

router.get("/chantiers", chantier_controller.getAllChantiers);
router.get("/chantier/:id", chantier_controller.getChantierById);
router.post("/chantier", chantier_controller.createChantier);
router.put("/chantier/:id", chantier_controller.updateChantier);
router.delete("/chantier/:id", chantier_controller.deleteChantierById);
router.get("/chantier_full/:id", chantier_controller.getChantierByIdFull);

router.post('/fiche_chantier', ficheChantierController.createFicheChantier);
router.get('/fiche_chantier/:id', ficheChantierController.getFicheChantierById);
router.get('/fiche_chantier_by_chantier/:id', ficheChantierController.getFicheChantierByChantierId);
router.get('/fiches_chantier', ficheChantierController.getAllFicheChantiers);
router.put('/fiche_chantier/:id', ficheChantierController.updateFicheChantier);
router.delete('/fiche_chantier/:id', ficheChantierController.deleteFicheChantierById);

router.post('/chantier_item', chantierItemController.createChantierItem);
router.get('/chantier_item/:id', chantierItemController.getItemsFromFicheById);
router.get('/chantier_items', chantierItemController.getAllChantierItems);
router.put('/chantier_item/:id', chantierItemController.updateChantierItem);
router.delete('/chantier_item/:id', chantierItemController.deleteChantierItemById);

router.post('/chantier_staff', chantierStaffController.createChantierStaff);
router.get('/chantier_staff/:id', chantierStaffController.getChantierStaffById);
router.get('/chantier_staffs', chantierStaffController.getAllChantierStaff);
router.put('/chantier_staff/:id', chantierStaffController.updateChantierStaff);
router.delete('/chantier_staff/:id', chantierStaffController.deleteChantierStaffById);



export default router;