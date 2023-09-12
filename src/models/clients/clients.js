const db = require('../../config/db');

async function viewClientsData(idClub){
    try{
        const [rows] = await db.query('CALL viewClientsData(?)', [idClub]);
        return rows[0];
    } catch (error){
        console.error('Mysql: ', error);
        throw error;
    }
}

async function viewStaffData(idClub){
    try{
        const [rows] = await db.query('CALL viewStaffData(?)', [idClub]);
        return rows[0];
    } catch (error){
        console.error(error);
        throw error;
    }
}

async function viewClientsSubs(idClub){
    try{
        const [rows] = await db.query('CALL viewClientsSubs(?)', [idClub]);
        return rows[0];
    } catch (error){
        console.error(error);
        throw error;
    }
}

module.exports = {
    viewClientsData,
    viewStaffData,
    viewClientsSubs
}