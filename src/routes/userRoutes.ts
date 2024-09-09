import express from 'express';
import { registerUser } from '../controller/userController';

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

export default router;
