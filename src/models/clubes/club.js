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

module.exports = {
    getClubes,
    registerClub
}