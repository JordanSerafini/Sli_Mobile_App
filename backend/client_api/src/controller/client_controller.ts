import { logError } from '../../middlewares/logger';
import { client_model } from '../model/client_model';
import { Request, Response } from 'express';


const customer_controller = {
   async getAllCustomers(req: Request, res: Response) {
    try {
      await client_model.getAllCustomers(req, res);
    } catch (err) {
      logError(err, req);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getCustomerById(req: Request, res: Response) {
    try {
      await client_model.getCustomerById(req, res);
    } catch (err) {
      logError(err, req);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getCustomerByName(req: Request, res: Response) {
    try {
      
      await client_model.getCustomerByName(req, res);
    } catch (err) {
      logError(err, req);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getCustomersPaginated(req: Request, res: Response) {
    try {
     // throw new Error('Erreur intentionnelle pour le test');
      await client_model.getCustomersPaginated(req, res);
    } catch (err) {
      logError(err, req);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async deleteCustomerById(req: Request, res: Response) {
    try {
      await client_model.deleteCustomerById(req, res);
    } catch (err) {
      logError(err, req);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async updateCustomerById(req: Request, res: Response) {
    try {
      await client_model.updateCustomerById(req, res);
    } catch (err) {
      logError(err, req);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async createCustomer(req: Request, res: Response) {
    try {
      await client_model.createCustomer(req, res);
    } catch (err) {
      logError(err, req);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  async getCustomersCluster(req: Request, res: Response) {
    try {
      await client_model.getCustomersWithinRadius(req, res);
    } catch (err) {
      logError(err, req);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default customer_controller;
