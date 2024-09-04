"use strict";
// 1. Crear el Type de planetas
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 2. Crear la Base de Datos DUMMY. Definir un array de planetas utilizando el Type Planet
const planets = [
    {
        id: 1,
        name: "Mercury",
        radius: 2439.7, // En kilómetros
        distanceFromSun: 57.9 // En millones de kilómetros
    },
    {
        id: 2,
        name: "Venus",
        radius: 6051.8, // En kilómetros
        distanceFromSun: 108.2 // En millones de kilómetros
    },
    {
        id: 3,
        name: "Earth",
        radius: 6371, // En kilómetros
        distanceFromSun: 149.6 // En millones de kilómetros
    },
    {
        id: 4,
        name: "Mars",
        radius: 3389.5, // En kilómetros
        distanceFromSun: 227.9 // En millones de kilómetros
    },
];
//! CONFIGURAR LAS RUTAS GET
// 1. Importyar Dependencias y Confoigurar Express
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json()); // Permite que Express procese datos JSON en el cuerpo de las solicitudes
// 2. Rutas para obtener todos los Planetas
app.get("/planets", (req, res) => {
    res.json(planets);
});
// 3. Rutas para obtener un solo planeta por ID
app.get("/planets/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const planet = planets.find((p) => p.id === id);
    if (planet) {
        res.json(planet);
    }
    else {
        res.status(404).json({ message: "Planet not found" });
    }
});
// 4. Iniciar el servidor
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
// 5. Ejecutar la aplicación
// npx tsc para compilar el archivo typescript en javascript
// node src/app.js para ejecutar el archivo una vez compilado
//! CONFIGURAR LAS RUTAS POST
// 1. Añadir una nueva ruta POST para crear un nuevo planeta
app.post("/planets", (req, res) => {
    const { name, radius, distanceFromSun } = req.body;
    // validar que todos los campos del planeta esten completos
    if (!name || !radius || !distanceFromSun) {
        return res
            .status(400)
            .json({ message: "Missing name, radius, or distanceFromSun" });
    }
    // crear un nuevo planeta
    const newPlanet = {
        id: planets.length + 1, // Asignar un nuevo ID al planeta
        name,
        radius,
        distanceFromSun
    };
    // agregar el nuevo planeta al array de planetas
    planets.push(newPlanet);
    // enviar respuesta con código de estado 201 (Creado)
    res.status(201).json(newPlanet);
});
