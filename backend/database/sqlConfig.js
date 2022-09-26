const sql = require('mssql');

const sqlConfig = {
    user: 'sa',
    password: 'mypassword',
    database: 'MusicDB',
    server: 'localhost',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      trustedconnection: true,
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }

  //if you have error with database
const connection = sql.connect(sqlConfig, (err,res)=>{
  if (err) {
      //throw err;
      console.log("Error to connect db!!");

  }else{
      console.log("db is connected!!");
  }
});
  
module.exports = sqlConfig


