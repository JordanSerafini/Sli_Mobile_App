import express from "express";
import auth_controller from "../controller/auth_controller";

const router = express.Router();

router.post('/', auth_controller.login)

export default router;