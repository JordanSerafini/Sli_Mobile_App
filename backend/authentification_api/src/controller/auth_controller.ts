import { login, UserType } from '../model/auth_model';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../../middlewares/logger';

dotenv.config();

const auth_controller = {
    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        try {
            const user: UserType | null = await login(email, password);
            if (!user) {
                logger.warn(`Invalid credentials for email: ${email}`);
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Générer un jeton JWT avec les informations de l'utilisateur (sans le mot de passe)
            const accessToken = jwt.sign(
                { 
                    id: user.id, 
                    email: user.email, 
                    role: user.role, 
                    nom: user.nom, 
                    prenom: user.prenom, 
                    telephone: user.telephone 
                },
                process.env.JWT_SECRET as string,
                { expiresIn: '7d' }
            );

            logger.info(`Login successful for email: ${email}`);
            res.json({ accessToken });
        } catch (error) {
            logger.error(`Error during login for email: ${email}`, { error: error.message });
            next(new Error(`Error during login: ${error.message}`));
        }
    }
};

export default auth_controller;
