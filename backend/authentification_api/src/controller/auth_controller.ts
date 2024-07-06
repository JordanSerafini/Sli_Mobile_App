import { login } from '../model/auth_model';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth_controller = {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const user = await login(req, res);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Générer un jeton JWT avec les informations de l'utilisateur (sans le mot de passe)
            const accessToken = jwt.sign(
                { id: user.id, email: user.email, role: user.role, nom: user.nom, prenom: user.prenom, isShadow: user.isShadow, utilisateur_id: user.utilisateur_id, position: user.position, telephone: user.telephone },
                process.env.JWT_SECRET as string,
                { expiresIn: '7d' }
            );

            res.json({ accessToken });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export default auth_controller;
