const express = require('express');
const authRoutes = require('./routes/auth');
const dbaccessapi = require('./routes/dbaccessapi');
const cors = require('cors');

const app = express();
app.use(cors());

// Configuración de CORS con encabezados permitidos y origen permitido
const corsOptions = {
    origin: 'http://dbaccessapi.blackgymfitclub.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Configuración de CORS en la aplicación
app.use(cors(corsOptions));

// Middleware para confiar en el encabezado X-Forwarded-Host
app.use((req, res, next) => {
    if (req.headers['x-forwarded-host']) {
        req.headers.host = req.headers['x-forwarded-host'];
    }
    next();
});

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/dbaccess/', dbaccessapi);

module.exports = app;
