require('dotenv').config();
const express = require('express');
const sequelize = require('../Config/database');

// Importamos los modelos
const { Usuario, Estacion, Conector, Reserva } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
        message: 'EcoVolt Backend funcionando correctamente',
        status: 'OK' 
    });
});

async function startServer() {
    try {
        console.log('🔌 Conectándose a la Base de Datos...');
        
        // Cambiado a alter: true (más seguro para entrega)
        await sequelize.sync({ alter: true });
        
        console.log('Modelos sincronizados correctamente');

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('No se pudo inicializar el ecosistema: ', error);
        process.exit(1);
    }
}

startServer();