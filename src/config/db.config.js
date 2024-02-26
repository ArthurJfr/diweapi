const mysql = require('mysql');
const dotenv = require('dotenv').config();

const dbConnection = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : '',
    database : process.env.DB_DATABASE
});

dbConnection.connect(error => {
    if(error) throw error;
    console.log("BDD connected");
});

module.exports = dbConnection;