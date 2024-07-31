import { stock_model } from "../model/stock_model";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { get } from "http";

dotenv.config();

const stock_controller = {
  getStockPaginated(req: Request, res: Response) {
    try {
      stock_model.getStockPaginated(req, res);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getStockDocDetails(req: Request, res: Response) {
    try {
      stock_model.getAllStockWithDetails(req, res);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getStorehouse(req: Request, res: Response) {
    try {
      stock_model.getAllStoreHouse(req, res);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getStockDocLine(req: Request, res: Response) {
    try {
      stock_model.getAllStockDocLines(req, res);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default stock_controller;
