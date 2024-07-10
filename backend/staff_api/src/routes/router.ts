import express from "express";
import { staff_controller } from "../controllers/staff_controller";

const router = express.Router();

router.post('/staff', staff_controller.createStaff);
router.get('/staff/:id', staff_controller.getStaffById);
router.get('/staff', staff_controller.getAllStaff);
router.put('/staff/:id', staff_controller.updateStaff);
router.delete('/staff/:id', staff_controller.deleteStaffById);

export default router;
