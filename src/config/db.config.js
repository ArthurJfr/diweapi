const mysql = require('mysql');
const dotenv = require('dotenv').config();

const dbConnection = mysql.createConnection({
    host : process.env.DB_HOST,
    user : 'root',
    password : '',
    database : 'diwebdd'
});

dbConnection.connect(error => {
    if(error) throw error;
    console.log("BDD connected");
});

module.exports = dbConnection;