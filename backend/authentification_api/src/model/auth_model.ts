import { Request, Response } from 'express';
import { pgClient } from '../client/client';
import bcrypt from 'bcryptjs';

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const query = `
        SELECT * FROM Utilisateurs WHERE email = $1;
    `;
    try {
        const result = await pgClient.query(query, [email]);
        if (result.rows.length === 0) {
            return null;
        }
        const user = result.rows[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            // Exclure le mot de passe avant de retourner l'utilisateur
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        return null;
    } catch (err) {
        throw err;
    }
};

export { login };
