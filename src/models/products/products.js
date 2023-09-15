const db = require('../../config/db');

async function crudProducts(productID, productName, productPrice, idCategory, typeAction){
    try {
        if(typeAction === 2) {
            const [rows] = await db.query('CALL crudProducts(?, ?, ?, ?, ?)', [productID, productName, productPrice, idCategory, typeAction]);
            return rows;
        } else {
            const [rows] = await db.query('CALL crudProducts(?, ?, ?, ?, ?)', [productID, productName, productPrice, idCategory, typeAction]);
            return rows[0];
        }
    } catch ( error ) {
        console.error('Mysql: ', error);
        throw error;
    }
};

module.exports = {
    crudProducts
}