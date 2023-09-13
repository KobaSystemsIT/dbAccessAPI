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
        const [rows] = await db.query('CALL crudClub(?, ?, ?, ?, ?)', [idClub, nameClub, addressClub, dataIFrame, typeAction]);
        if(typeAction != 2){
            return rows[0];
        } else {
            return rows;
        }
    } catch ( error ) {
        console.error('Mysql: ', error);

    }
};

module.exports = {
    getClubes,
    getClubesData, 
    crudClub
}