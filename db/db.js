const mysql = require('mysql2');
//local mysql db connection
const dbConn = mysql.createConnection({
  host: 'database',
  user: 'root',
  database : 'Q_A',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

dbConn.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log("Database Connected!");
});

module.exports = dbConn;