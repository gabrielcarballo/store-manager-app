const mySQL = require('mysql2/promise');

require('dotenv').config();

const connection = mySQL.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'StoreManager',
});

module.exports = connection;