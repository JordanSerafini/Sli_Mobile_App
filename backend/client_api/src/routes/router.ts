import express from "express";
import client_controller from "../controller/client_controller";

const router = express.Router();

router.get('/customers', client_controller.getAllCustomers);
router.get('/customer/:id', client_controller.getCustomerById);
router.get('/customer/:name', client_controller.getCustomerByName);
router.get('/customers/paginated', client_controller.getCustomersPaginated);
router.post('/customers', client_controller.createCustomer);
router.put('/customer/:id', client_controller.updateCustomerById);
router.delete('/customer/:id', client_controller.deleteCustomerById);

export default router;