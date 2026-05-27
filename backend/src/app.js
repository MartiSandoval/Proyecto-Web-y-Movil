import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import pool from './config/db.js'; 

const app = express();

// Middlewares globales
app.use(cors()); // Permite que Ionic se comunique con este backend
app.use(express.json()); // Permite recibir datos en formato JSON

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ mensaje: "Servidor Express funcionando correctamente", estado: "ok" });
});

// Iniciar el servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Ruta para verificar que podemos LEER la base de datos
app.get('/marti_hehe', async (req, res) => {
    try {
        // Le pedimos a PostgreSQL la hora actual de su servidor
        const resultado = await pool.query('SELECT NOW()');
        
        res.json({
            exito: true,
            mensaje: "plop",
        });
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.status(500).json({ 
            exito: false, 
            error: "La conexión existe, pero falló la consulta." 
        });
    }
});

/*Ya, para esto se puede hacer de 2 formas la primera es así 
const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send("¡Hola desde Express!");
});

app.listen(8000, () => {
    console.log("Servidor corriendo en el puerto 8000");
});
 en esta no habría que cambiar el package.json, pero si queremos hacerlo con import si.
 en el package.json habría que poner
 "type" : "module",
*/
// se importa
/*import express from "express"
//const express = require("express")
const app = express() //se crea una instancia

app.listen(3001, () => {
    console.log("Eschuchando en http://localhost:3001")
})
*/
