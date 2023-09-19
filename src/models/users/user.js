const db = require('../../config/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// se utiliza para iniciar sesión
async function login(username) {
  const [rows] = await db.query('CALL getDataUserAdmin(?)', [username]);
  if (rows.length === 0) {
    return null; //
  }
  return rows[0];
}
//metodo para registrar un nuevo usuario
async function crudUserSystem(adminID, username,  password, idUserType, typeAction) {
  try {
    const plainPassword = password;

    const hashedPassword = await hashPassword(plainPassword);

    if(typeAction === 2){
      const [rows] = await db.query('CALL crudUserSystem(?, ?, ?, ?, ?)', [adminID, username, hashedPassword, idUserType, typeAction]);
      return rows;
    } else {
      const [rows] = await db.query('CALL crudUserSystem(?, ?, ?, ?, ?)', [adminID, username, hashedPassword, idUserType, typeAction]);
      return rows[0];
    }
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
  const [rows] = await db.query('SELECT idUser, CONCAT(username, " ", lastName) as NombreUsuario FROM users WHERE username LIKE ?', [name]);
  return rows;
}

async function changePassword(username, password) {
  try {
    const plainPassword = password;
    const hashedPassword = await hashPassword(plainPassword);
    const [rows] = await db.query('UPDATE adminUser set password = ? WHERE username = ?', [hashedPassword, username]);
    if (rows.affectedRows === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Mysql: ', error);
    throw error;

  }
}

async function newUserOrStaff(username, lastname, phone, email, nameEmergency, phoneEmergency, idUserType, idClub, fecha){
  try {
    const [rows] = await db.query('CALL createUserAndBiometricData(?, ?, ?, ?, ?, ?, ?, ?, ?)', [username, lastname, phone, email, nameEmergency, phoneEmergency, idUserType, idClub, fecha]);
    return rows[0];
  } catch (error) {
    console.error('Mysql: ', error);
    throw error;
  }

}

async function modifyOrDeleteUser(idUser, username, lastname, phone, email, nameContact, phoneContact, valueOption){
  try {
    const [rows] = await db.query('CALL modifyOrDeleteUser(?, ?, ?, ?, ?, ?, ?, ?)', [idUser, username, lastname, phone, email, nameContact, phoneContact, valueOption]);
    return rows[0];
  } catch ( error ) {
    console.error('Mysql: ', error);
    throw error;
  }

}

async function getDataUser(idUser) {
  const [rows] = await db.query('SELECT username, lastName, phoneNumber, email, nameEmergencyContact, emergencyContact FROM users where idUser = ?', [idUser]);
  return rows;
}
module.exports = {
  login,
  crudUserSystem,
  getUserbyName,
  changePassword, 
  newUserOrStaff,
  modifyOrDeleteUser,
  getDataUser,
}
