const db = require('../../config/db');

async function getClubes(){
    const [rows] = await db.query('SELECT idClub, nameClub, addressClub, dataIFrame FROM clubes');
    if(rows.length === 0){
        return null;
    }
    return rows;
};

async function getClubesData() {
    const [rows] = await db.query('SELECT * FROM getClubesData');
    return rows;
};

async function crudClub(idClub, nameClub, addressClub, dataIFrame, typeAction){
    try {
        if(typeAction === 2) {
        const [rows] = await db.query('CALL crudClub(?, ?, ?, ?, ?)', [idClub, nameClub, addressClub, dataIFrame, typeAction]);
        return rows;
        } else {
            const [rows] = await db.query('CALL crudClub(?, ?, ?, ?, ?)', [idClub, nameClub, addressClub, dataIFrame, typeAction]);
            return rows[0];
        }
    } catch ( error ) {
        console.error('Mysql: ', error);
        throw error;
    }
};

async function getClubDatabyId(idClub){
    const [rows] = await db.query('SELECT * FROM clubes WHERE idClub = ?', [idClub]);
    return rows[0];
}

module.exports = {
    getClubes,
    getClubesData, 
    crudClub,
    getClubDatabyId
}