const db = require('../../config/db');

async function getClubes(){
    const [rows] = await db.query('SELECT idClub, nameClub, addressClub FROM clubes');
    if(rows.length === 0){
        return null;
    }
    return rows;
}

module.exports = {
    getClubes
}