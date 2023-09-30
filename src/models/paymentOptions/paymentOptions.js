const db = require('../../config/db');

async function getPaymentOptions() {
    try {
        const [rows] = await db.query('SELECT * FROM paymentOptions');
        return rows;
    } catch (error) {
        console.error('Mysql: ', error);
        throw error;
    }
}

module.exports = {
    getPaymentOptions
}