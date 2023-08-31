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

module.exports = {
    registerFingerData,
}