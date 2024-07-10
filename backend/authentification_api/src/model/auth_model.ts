import { pgClient } from '../client/client';
import bcrypt from 'bcryptjs';

interface UserType {
    id: number;
    email: string;
    role: number;
    nom: string;
    prenom: string;
    isShadow: boolean;
    utilisateur_id: number | null;
    position: string | null;
    telephone: string | null;
}

const login = async (email: string, plainPassword: string): Promise<UserType | null> => {
    const query = `
        SELECT id, email, role, nom, prenom, isShadow, utilisateur_id, position, telephone, password
        FROM Utilisateurs
        WHERE email = $1;
    `;
    try {
        const result = await pgClient.query(query, [email]);
        if (result.rows.length === 0) {
            console.log('User not found');
            return null;
        }
        const user = result.rows[0];
        const isPasswordMatch = await bcrypt.compare(plainPassword, user.password);
        if (!isPasswordMatch) {
            console.log('Invalid password');
            return null;
        }

        // Exclure le mot de passe avant de retourner l'utilisateur
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword as UserType;
    } catch (err) {
        console.error('Error during login:', err);
        throw err;
    }
};

export { login, UserType };
