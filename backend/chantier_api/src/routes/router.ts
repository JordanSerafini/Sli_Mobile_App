import express from "express";
import {  chantier_controller } from "../controllers/chantier_controller";

const router = express.Router();

router.post("/createChantier", chantier_controller.createChantier);


export default router;