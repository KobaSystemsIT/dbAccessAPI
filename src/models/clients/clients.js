const db = require('../../config/db');

async function viewClientsData(idClub){
    try{
        const [rows] = await db.query('CALL viewClientsData(?)', [idClub]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    } catch (error){
        console.error('Mysql: ', error);
        throw error;
    }
}

module.exports = {
    viewClientsData
}