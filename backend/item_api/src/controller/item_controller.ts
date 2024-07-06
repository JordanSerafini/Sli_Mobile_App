import { item_model } from "../model/item_model";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const item_controller = {
  async getAllItems(req: Request, res: Response) {
    try {
      await item_model.getAllItems(req, res);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getItemById(req: Request, res: Response) {
    try {
      await item_model.getItemById(req, res);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getItemsPaginated(req: Request, res: Response) {
    try {
      await item_model.getItemsPaginated(req, res);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async deleteItemById(req: Request, res: Response) {
    try {
      await item_model.deleteItemById(req, res);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async updateItemById(req: Request, res: Response) {
    try {
      await item_model.updateItemById(req, res);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async createItem(req: Request, res: Response) {
    try {
      await item_model.createItem(req, res);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default item_controller;
