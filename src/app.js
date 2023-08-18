const express = require('express');
const authRoutes = require('./routes/auth');
const dbaccessapi = require('./routes/dbaccessapi');
const cors = require('cors');

const app = express();
app.use(cors());

app.enable('trust proxy');

app.use((req, res, next) => {
    if (req.headers['x-forwarded-host']) {
        req.headers.host = req.headers['x-forwarded-host'];
    }
    next();
});

app.use(express.json());
app.get('/', (req, res)=>{
	res.send('Bienvenido a dbaccessapi');
});
app.use('/api', authRoutes);
app.use('/api/dbaccess/', dbaccessapi);

module.exports = app;
