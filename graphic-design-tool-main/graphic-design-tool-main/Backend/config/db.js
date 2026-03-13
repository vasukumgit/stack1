const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "graphic_tool",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

//  Test connection immediately
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("MySQL Connected Successfully");
    connection.release();
  } catch (error) {
    console.error(" MySQL Connection Failed:", error.message);
  }
})();

module.exports = db;
