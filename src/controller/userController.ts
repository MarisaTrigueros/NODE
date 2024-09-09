import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../db';

// Función para registrar un nuevo usuario
export const registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        await db.none('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err: unknown) {
        if (err instanceof Error) {
          res.status(500).json({ message: 'Error registering user', error: err.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        };
    };
};
