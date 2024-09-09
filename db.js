"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar variables de entorno desde el archivo .env
dotenv_1.default.config();
// Crear una instancia de pg-promise
const pgp = (0, pg_promise_1.default)();
// Verifica que DATABASE_URL esté definida
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined in .env file');
}
const db = pgp(databaseUrl);
exports.default = db;
