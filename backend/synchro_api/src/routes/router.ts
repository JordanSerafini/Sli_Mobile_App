import express from "express";
import synchro_Controller from "../controllers/synchro_controller";

const router = express.Router();

router.get('/createTables', synchro_Controller.createTables);
router.get('/insertDataSelected', synchro_Controller.insertDataFromMSSQLToPGSQLSelect);


export default router;
