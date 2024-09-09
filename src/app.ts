import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import { jwtStrategy } from './passport-config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './db';
import userRoutes from './routes/userRoutes'; // Importa las rutas de usuario

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(passport.initialize());
passport.use(jwtStrategy);

// Usa las rutas de usuario
app.use('/users', userRoutes);

// Ruta para login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.SECRET as string, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Ruta protegida
app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'You have access to this protected route!' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
