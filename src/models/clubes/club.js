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

module.exports = {
    getClubes,
    registerClub,
    getClubesData
}