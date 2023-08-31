const db = require('../../config/db');

async function registerFingerData(idUser, biometricData, fecha){
    try{
        const [rows] = await db.query('CALL registerFingerData(?, ?, ?)', [idUser, biometricData, fecha])
        return rows[0];
    } catch (error){
        console.error('Mysql: ', error);
        throw error;
    }
}

async function getFingerData(){
    try{
        const [rows] = await db.query('SELECT idUser, biometricData FROM biometricDataUser');
        return rows;
    } catch (error){
        console.error('Mysql: ', error);
        throw error;
    }
}

async function logIngOutRegister(idUser, idClub, horaEntrada, horaSalida){
    try{
        const [rows] = await db.query('CALL logInOutFingerPrint(?, ?, ?, ?)', [idUser, idClub, horaEntrada, horaSalida]);
        return rows[0];
    } catch (error){
        console.error(error);
        throw error;
    }
}

module.exports = {
    registerFingerData,
    getFingerData,
    logIngOutRegister
}