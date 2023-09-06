const db = require('../../config/db');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de rondas de encriptación

async function getUserByUsername(username) {
  const [rows] = await db.query('CALL getDataUserAdmin(?)', [username]);
  if (rows.length === 0) {
    return null; //
  }
  return rows[0];
}

async function registerUser(username, password, idTypeUser) {
  try {
    const plainPassword = password;

    const hashedPassword = await hashPassword(plainPassword);

    const [rows] = await db.query('CALL addUser(?, ?, ?)', [username, hashedPassword, idTypeUser]);
    return rows;
  } catch (error) {
    console.error('Mysql: ', error);
    throw error;
  }
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function getUserbyName(username) {
  const name = `%${username}%`; 
  const [rows] = await db.query('SELECT idUser, username FROM users WHERE username LIKE ?', [name]);
  return rows;
}

async function changePassword(username, newPassword) {
  try {
    const plainPassword = newPassword;
    const hashedPassword = await hashPassword(plainPassword);
    const [rows] = await db.query('UPDATE adminUser set password = ? WHERE username = ?', [hashedPassword, username]);
    return rows[0];
  } catch (error) {
    console.log('Mysql: ', error);
    throw error;

  }
}
module.exports = {
  getUserByUsername,
  registerUser,
  getUserbyName, 
  changePassword
}
