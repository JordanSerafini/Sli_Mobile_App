import express from "express";
import item_controller from "../controller/item_controller";

const router = express.Router();

router.get('/items' , item_controller.getAllItems);
router.get('/items/:id' , item_controller.getItemById);
router.get('/items/paginated' , item_controller.getItemsPaginated);

export default router;