"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_config_1 = require("./passport-config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("./db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes")); // Importa las rutas de usuario
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
passport_1.default.use(passport_config_1.jwtStrategy);
// Usa las rutas de usuario
app.use('/users', userRoutes_1.default);
// Ruta para login
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield db_1.default.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}));
// Ruta protegida
app.get('/protected', passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: 'You have access to this protected route!' });
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
