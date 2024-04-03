const mysql = require('mysql');
const dotenv = require('dotenv').config();

const dbConnection = mysql.createConnection({
    host :  'localhost',//process.env.DB_HOST,
    user : 'root',//process.env.DB_USER,
    password : '',
    database : 'diwebdd'//process.env.DB_DATABASE
});

dbConnection.connect(error => {
    if(error) throw error;
    console.log("BDD connected");
});



module.exports = dbConnection;