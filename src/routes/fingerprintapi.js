const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const db = require('../config/db');

const router = express.Router();
router.post('/registerUserBiometric', authenticateToken, async (req, res) => {
    const { idUser, biometricData } = req.body;
    
    try {
        const query = 'INSERT INTO biometricDataUser (iduser, biometricData, created_at) VALUES (?, ?, NOW())';
        const [result] = await db.query(query, [idUser, biometricData]);
        
        if (result.affectedRows === 1) {
            res.json({ message: 'Usuario registrado con huella digital exitosamente' });
        } else {
            res.status(500).json({ error: 'ServerError', message: 'Error al registrar la huella digital' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
});

// Otro endpoint que puedas necesitar en el futuro

module.exports = router;
