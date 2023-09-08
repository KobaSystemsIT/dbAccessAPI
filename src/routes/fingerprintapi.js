const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const { registerFingerData, getFingerData, logIngOutRegister } = require('../models/fingerprint/fingerprint');
const { getUserbyName } = require('../models/users/user');

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
    const timeZone = 'America/Mexico_City';

    const options = {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Formato de 24 horas
    };

    const currentDate = new Date();
    const formattedDate = new Date(currentDate.toLocaleString('en-US', options));

    const horaIngresoSalida = formattedDate;
    try {
        const [data] = await logIngOutRegister(idUser, idClub, horaIngresoSalida, horaIngresoSalida)
        if (!data) return res.status(404).send('Ocurrió un error al iniciar sesión');
        res.json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
})

router.post('/getUserbyName', authenticateToken, async (req, res) => {
    const { username } = req.body;

    try {
        const data = await getUserbyName(username);
        if (!data) return res.status(404).send('Ocurrió un error al obtener los datos');
        res.json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
    }
})
// Otro endpoint que puedas necesitar en el futuro

module.exports = router;
