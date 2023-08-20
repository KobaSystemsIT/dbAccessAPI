const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const req = require('express/lib/request');

const router = express.Router();

router.get('/protected', authenticateToken, (req, res) =>{
    res.json({ message: 'Bienvenido a la ruta protegida', user: req.user});
})

router.get('/obtainDataUsers', authenticateToken, (req, res) =>{
    res.json({ message: 'Bienvenido al método para obtener datos'});
})

module.exports = router;