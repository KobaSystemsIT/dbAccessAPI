const express = require('express');
const authRoutes = require('./routes/auth');
const dbaccessapi = require('./routes/dbaccessapi');

const app = express();

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', dbaccessapi);

module.exports = app;
