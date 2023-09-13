const db = require('../../config/db');

async function getClubes(){
    const [rows] = await db.query('SELECT idClub, nameClub, addressClub, dataIFrame FROM clubes');
    if(rows.length === 0){
        return null;
    }
    return rows;
}

async function registerClub(){

}

async function getClubesData() {
    const [rows] = await db.query('SELECT * FROM getClubesData');
    return rows;
}

async function newClub(nameClub, addressClub){
    try {
        const [rows] = await db.query('CALL createClub(?, ?)', [nameClub, addressClub]);
        return rows[0];
    } catch ( error ) {
        cnsole
    }
}

module.exports = {
    getClubes,
    registerClub,
    getClubesData, 
    newClub
}