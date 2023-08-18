const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const req = require('express/lib/request');

const router = express.Router();

router.get('/dbaccess/protected', authenticateToken, (req, res) =>{
    res.json({ message: 'Bienvenido a la ruta protediga', user: req.user});
})

module.exports = router;