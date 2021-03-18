const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  user: 'root',
  password : '',
  database : 'Q_A'
});

dbConn.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log("Database Connected!");
});

module.exports = dbConn;