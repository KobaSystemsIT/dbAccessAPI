const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getClubes } = require('../models/clubes/club');
const { getPlanes } = require('../models/planes/plan');
const { getUserByUsername, changePassword } = require('../models/users/user');

require('dotenv').config();

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password, idClub } = req.body;
  try {
    const [user] = await getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ error: 'UserNotFound', message: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'InvalidPassword', message: 'Contraseña incorrecta' });
    }
    const tokenExpiration = Math.floor(Date.now() / 1000) + 3600;
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user.adminID, userType: user.rol, idClub: idClub, exp: tokenExpiration}, secretKey);
    
    res.setHeader('Authorization', token);
    res.setHeader('X-Token-Expiration', tokenExpiration.toString());

    res.json({ idUser: user.adminID, username: user.username, rol: user.rol, idClub: idClub});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
  }
});

router.get('/getClubes', async (req, res) => {
  try {
    const data = await getClubes();
    if (!data) return res.status(404).send('Ocurrió un error.');
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
  }
});

router.get('/getPlanes', async (req, res) => {
  try {
    const data = await getPlanes();
    if (!data) return res.status(404).send('Ocurrió un error.');
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
  }
});

router.put('/changePassword', async (req, res) => {
  const { username, password } = req.body;

  try {
    const data = await changePassword(username, password);
    console.log(data)
    if (!data) return res.status(404).send('Ocurrió un error.');
    res.json({ message: 'Contraseña actualizada con éxito.'  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'ServerError', message: 'Error en el servidor' });
  }
});

module.exports = router;
