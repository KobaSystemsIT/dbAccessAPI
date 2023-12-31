const db = require('../../config/db');

async function crudSuppliers(idSupplier, nameSupplier, typeAction){
    try {
        const [rows] = await db.query('CALL crudSuppliers (?, ?, ?)', [idSupplier, nameSupplier, typeAction]);
        if(typeAction === 2) { 
            return rows;
        } else {
            return rows[0];
        }
    } catch (error) {
        console.error('Mysql: ', error);
        throw error;
    }
};

async function paySuppliers(payment, conceptPayment, idSupplier, idClub, adminID, fechaPago, idPaymentOption, typeAction){
    try {
        const [rows] = await db.query('CALL paySuppliers(?, ?, ?, ?, ?, ?, ?, ?)', [payment, conceptPayment, idSupplier, idClub, adminID, fechaPago, idPaymentOption, typeAction]);
        if(typeAction === 2) { 
            return rows;
        } else {
            return rows[0];
        }
    } catch (error) {
        console.error('Mysql:', error);
        throw error;
    }
}

module.exports = {
    crudSuppliers,
    paySuppliers
}