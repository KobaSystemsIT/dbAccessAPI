const db = require('../../config/db');

async function crudProducts(productID, productName, productPrice, idCategory, typeAction){
    try {
        const [rows] = await db.query('CALL crudProducts(?, ?, ?, ?, ?)', [productID, productName, productPrice, idCategory, typeAction]);
        if(typeAction === 2) {
            return rows;
        } else {
            return rows[0];
        }
    } catch ( error ) {
        console.error('Mysql: ', error);
        throw error;
    }
};

async function crudCategoriesProducts(productCategoryID, nameCategory, typeAction){
    try {
        const [rows] = await db.query('CALL crudCategoriesProducts(?, ?, ?)', [productCategoryID, nameCategory, typeAction]);
        if(typeAction === 2){
            return rows;
        } else {
            return rows[0];
        }
    } catch (error) {
        console.log('Mysql: ', error);
        throw error;
    }
}


async function pointOfSale(cantProducts, totalVenta, productID, fechaVenta, idClub, typeAction, idPaymentOption){
    try {
        const [rows] = await db.query('CALL pointOfSale(?, ?, ?, ?, ?, ?, ?)', [cantProducts, totalVenta, productID, fechaVenta, idClub, typeAction, idPaymentOption]);
        if(typeAction != 1){
            return rows;
        } else {
            return rows[0];
        }
    } catch (error){
        console.error('Mysql: ', error);
        throw error;
    }
}

async function openOrCloseCashRegister(idCaja, monto, idClub, adminID, fechaHora, typeAction){
    try {
        const [rows] = await db.query('CALL openOrCloseCashRegister(?, ?, ?, ?, ?, ?)', [idCaja, monto, idClub, adminID, fechaHora, typeAction]);
        if(typeAction != 1){
            return rows;
        } else {
            return rows[0];
        }
    } catch (error){
        console.error('Mysql: ', error);
        throw error;
    }
}

module.exports = {
    crudProducts, 
    crudCategoriesProducts,
    pointOfSale,
    openOrCloseCashRegister
    
}