const mysql = require('mysql2/promise');

require('dotenv').config();

const dataSQL = mysql.createPool({
    host: '74.208.63.34',
    user: 'admin',
    password: 'kObaSys2023',
    database: 'blackgymsys'
});

module.exports = dataSQL;
