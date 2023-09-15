const db = require('../../config/db');

async function crudInventory(inventoryID, currentStock, dateReorder, productID, idClub, typeAction) {
    try {
        if(typeAction === 2){
            const [rows] = await db.query('CALL crudInventory(?, ?, ?, ?, ?, ?)', [inventoryID, currentStock, dateReorder, productID, idClub, typeAction]);
            return rows;
        } else {
            const [rows] = await db.query('CALL crudInventory(?, ?, ?, ?, ?, ?)', [inventoryID, currentStock, dateReorder, productID, idClub, typeAction]);
            return rows[0];
        }
    } catch (error){
        console.error('Mysql: ', error);
        throw error;
    }
}


module.exports = {
    crudInventory
}
