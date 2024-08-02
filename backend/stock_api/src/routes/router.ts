import express from "express";
import stock_controller from "../controller/stock_controller";

const router = express.Router();

router.get('/paginated' , stock_controller.getStockPaginated);
router.get('/stockdocFull' , stock_controller.getStockDocDetails);
router.get('/stockdocline', stock_controller.getStockDocLine);

router.get('/storehouse' , stock_controller.getStorehouse);

router.get('/storehouse/:id' , stock_controller.getStorehouseNameById);
router.get('/stockdocdetailsjoin/:DocumentId', stock_controller.getStockWithDetailsByDocumentId);
router.get('/stockdocdetails/:DocumentId', stock_controller.getStocByDocId);
router.get('/stockdocline/:DocumentId', stock_controller.getStockDocLineByDocumentId);

export default router;