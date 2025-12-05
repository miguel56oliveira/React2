const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,      // << usa a variável do .env
  password: process.env.DB_PASS,  // << usa a variável do .env
  database: process.env.DB_NAME,  // << usa a variável do .env
  port: process.env.DB_PORT || 3306
});

module.exports = pool.promise();
