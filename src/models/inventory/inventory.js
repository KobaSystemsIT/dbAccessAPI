const db = require('../../config/db');

async function getInventory(idClub) {
    try {
        const [rows] = await db.query('CALL getInventoryData(?)', [idClub]);
        return rows;
    } catch (error) {
        console.error('Mysql: ', error);
        throw error;
    }
}

async function deleteProductInventory(inventoryID, idClub){
    try{
        const rows = await db.query('DELETE FROM inventory WHERE inventoryID = ? and idClub = ?', [inventoryID, idClub]);
        return rows[0];
    } catch (error) {
        console.error('Msql: ', error);
        throw error;
    }   
}

async function addOrUpdateInventory(cantProductos, productID, idClub, fecha){
    try{
        const [rows] = await db.query('CALL addProductsInventory(?, ?, ?, ?)', [cantProductos, productID, idClub, fecha]);
        return rows[0];
    } catch (error){
        console.error('Mysql: ', error);
        throw error;
    }
}


module.exports = {
    getInventory,
    deleteProductInventory,
    addOrUpdateInventory,
}
