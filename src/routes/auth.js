const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getUserByUsername, registerUser } = require('../models/user');
require('dotenv').config();

const router = express.Router();

router.post('/register', async (req, res) =>{
    const { username, password } = req.body;

    try {
        const user = await registerUser(username, password);
        if(!user) return res.status(200).send('Usuario registrado con éxito.');
        const message = {message: 'Usuario registrado', user: user.username};
        res.json({message});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
})

router.post('/login', async (req, res) => {
    const { username, password, idClub } = req.body;
    try {
      const [user] = await getUserByUsername(username);
      if (!user) return res.status(404).send('User not found');
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(401).send('Invalid password');
      const secretKey = process.env.JWT_SECRET;
      const data = ({ idUser: user.adminID, username: user.username, userType: user.nameUserType})
      const token = jwt.sign({ id: user.adminID, userType: user.username, idClub:idClub}, secretKey);
      res.json({ data:data, token: token  });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;
