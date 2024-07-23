import express from "express";
import synchro_Controller from "../controllers/synchro_controller";
import CoordinateSyncController from "../controllers/coordinate_controller";

const router = express.Router();

router.get('/createTables', synchro_Controller.createTables);
router.get('/insertDataSelected', synchro_Controller.insertDataFromMSSQLToPGSQLSelect);

router.get('/dropTables', synchro_Controller.dropAllTables);
router.get('/truncateTables', synchro_Controller.truncateAllTables);
router.get('/truncateTable/:tableName', synchro_Controller.truncateTable);

router.get('/updateCustomerCoordinates', CoordinateSyncController.updateAllCustomerCoordinates);



export default router;
