const express = require('express');
const authRoutes = require('./src/routes/auth');
const dbaccessapi = require('./src/routes/dbaccessapi');
const fingerprintapi = require('./src/routes/fingerprintapi');
const cors = require('cors');

const app = express();

// Habilita CORS con encabezados permitidos y origen permitido
const corsOptions = {
  origin: '*', // Cambia '*' a tu dominio en producción
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Middleware para confiar en el encabezado X-Forwarded-Host
// app.use((req, res, next) => {
//   if (req.headers['x-forwarded-host']) {
//     req.headers.host = req.headers['x-forwarded-host'];
//   }
//   next();
// });

app.use((req, res, next) => {
    res.header('Access-Control-Expose-Headers', 'Authorization');
    next();
});

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Bienvenido a dbaccessapi');
});
app.use('/api', authRoutes);
app.use('/api/dbaccess/', dbaccessapi);
app.use('/api/fingerprint/', fingerprintapi);

module.exports = app;
