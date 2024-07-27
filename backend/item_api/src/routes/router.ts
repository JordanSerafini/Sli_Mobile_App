import express from "express";
import item_controller from "../controller/item_controller";

const router = express.Router();

router.get('/' , item_controller.getAllItems);
router.get('/paginated' , item_controller.getItemsPaginated);
router.post('/' , item_controller.createItem);
router.get('/:id' , item_controller.getItemById);

export default router;