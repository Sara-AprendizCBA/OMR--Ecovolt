require('dotenv').config();
const express = require('express');
const sequelize = require('../Config/database');

const Usuario = require('./models/Usuario');
const Estacion = require('./models/Estacion');

const { start } = require('node:repl');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function startServer() {
    try {
        console.log('Conectandose a la BD...')
        await sequelize.sync({ alert:true });
        console.log('Modelos se actualizaron correctamente');

        app.listen(PORT, () => {
            console.log('Backend corriendo en http://localhost:${PORT}');
        })
    }  catch (error) {
        console.error('No se pudo inicializar el ecosistema: ', error)
        process.exit(1);
    }
}

startServer();