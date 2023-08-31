const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const { registerFingerData } = require('../models/fingerprint/fingerprint');

const router = express.Router();

router.post('/registerUserBiometric', authenticateToken, async (req, res) => {
    const { idUser, biometricData, fecha } = req.body;
    
    try {
        const data = await registerFingerData(idUser, biometricData, fecha);
        if(!data) return res.status(404).send('Ocurrió un error.');
        res.json({data});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
});

// Otro endpoint que puedas necesitar en el futuro

module.exports = router;
