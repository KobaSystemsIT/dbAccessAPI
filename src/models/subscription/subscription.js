const db = require('../../config/db');

async function crudSubscription(idSub, nameSubscription, daysSubscription, priceSubscription, typeAction){
    try {
        const [rows] = await db.query('CALL crudSubscription (?, ?, ?, ?, ?)', [idSub, nameSubscription, daysSubscription, priceSubscription, typeAction])
        if(typeAction === 2) {
            return rows;
        } else {
            return rows[0];
        }
    } catch (error) {
        console.error('Mysql: ', error);
        throw error;
    }

}

async function newOrUpdateSubscription(idUser, idSubscriptionType, idClub, startDate, endDate){
    try{
        const [rows] = await db.query('CALL newOrUpdateSubscription(?, ?, ?, ?, ?)', [idUser, idSubscriptionType, idClub, startDate, endDate]);
        return rows[0];
    } catch (error) {
        console.error('Mysql: ', error);
        throw error;
    }
}

module.exports = {
    crudSubscription,
    newOrUpdateSubscription
}