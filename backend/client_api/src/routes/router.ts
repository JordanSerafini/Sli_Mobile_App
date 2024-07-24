import express from "express";
import client_controller from "../controller/client_controller";

const router = express.Router();

router.get('/paginated', client_controller.getCustomersPaginated);
router.get('/cluster', client_controller.getCustomersCluster);
router.get('/', client_controller.getAllCustomers);
router.get('/:id', client_controller.getCustomerById);
router.get('/:name', client_controller.getCustomerByName);
router.post('/', client_controller.createCustomer);
router.put('/:id', client_controller.updateCustomerById);
router.delete('/:id', client_controller.deleteCustomerById);



export default router;