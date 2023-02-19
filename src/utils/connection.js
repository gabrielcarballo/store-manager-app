const mySQL = require('mysql2/promise');

const connection = mySQL.createPool({
  host: 'db',
  port: '3306',
  user: 'root',
  password: 'password',
});

module.exports = connection;