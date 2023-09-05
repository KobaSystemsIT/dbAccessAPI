const db = require('../../config/db');

async function getPlanes(){
    const [rows] = await db.query('SELECT idPlanes, namePlanes, descriptionPlanes, pricePlanes FROM planes');
    if(rows.length === 0){
        return null;
    }
    return rows;
}


module.exports = {
    getPlanes,
}