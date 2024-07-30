import express from "express";
import stock_controller from "../controller/stock_controller";

const router = express.Router();

router.get('/paginated' , stock_controller.getStockPaginated);
router.get('/stockdoc' , stock_controller.getStockDocDetails);

router.get('/storehouse' , stock_controller.getStorehouse);


export default router;