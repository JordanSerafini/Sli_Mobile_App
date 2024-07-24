import { login, UserType } from "../model/auth_model";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger, { logError } from "../../middlewares/logger";

dotenv.config();

const auth_controller = {
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const user: UserType | null = await login(email, password);
      if (!user) {
        logError(new Error("Invalid credentials"), req, { email });
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Générer un jeton JWT avec les informations de l'utilisateur (sans le mot de passe)
      const accessToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
          nom: user.nom,
          prenom: user.prenom,
          telephone: user.telephone,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );

      logger.info(`Login successful for email: ${email}`, {
        ip: req.ip,
        url: req.originalUrl,
        method: req.method,
      });
      res.json({
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          nom: user.nom,
          prenom: user.prenom,
          telephone: user.telephone,
        },
      });
    } catch (error) {
      logError(error, req, { email });
      next(new Error(`Error during login: ${error.message}`));
    }
  },
};

export default auth_controller;
