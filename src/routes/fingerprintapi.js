const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const { registerFingerData, getFingerData, logIngOutRegister } = require('../models/fingerprint/fingerprint');

const router = express.Router();

router.post('/registerUserBiometric', authenticateToken, async (req, res) => {
    const { idUser, biometricData, fecha } = req.body;

    try {
        const data = await registerFingerData(idUser, biometricData, fecha);
        if (!data) return res.status(404).send('Ocurrió un error al registrar los datos.');
        res.json({ data });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
});

router.get('/getFingerData', authenticateToken, async (req, res) => {
    try {
        const data = await getFingerData();
        if (!data) return res.status(404).send('Ocurrió un error al devolver los datos.');
        res.json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
})

router.post('/logInOutAccess', authenticateToken, async (req, res) => {
    const { idUser, idClub } = req.body;

    const currentDate = new Date();
    const formattedDate = new Date(currentDate.toLocaleString('en-US', { timeZone: 'America/Merida' }));

    const horaIngresoSalida = formattedDate.toISOString().slice(0, 19).replace('T', ' ');
    try {
        const [data] = await logIngOutRegister(idUser, idClub, horaIngresoSalida, horaIngresoSalida)
        if (!data) return res.status(404).send('Ocurrió un error al iniciar sesión');
        res.json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
})
// Otro endpoint que puedas necesitar en el futuro

module.exports = router;
