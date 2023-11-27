require('dotenv').config()
const mysql2 = require('mysql2')

const mysqlConnection = mysql2.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
  })

module.exports = mysqlConnection;