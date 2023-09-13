const db = require('../../config/db');

//sp para traer los datos de Clientes, Subscripciones de clientes y Staff
async function viewDataClientsOrStaff(idClub, typeAction){
    try{
        const [rows] = await db.query('CALL viewDataClientsOrStaff(?, ?)', [idClub, typeAction]);
        return rows[0];
    } catch (error){
        console.error('Mysql: ', error);
        throw error;
    }
}

module.exports = {
    viewDataClientsOrStaff
}