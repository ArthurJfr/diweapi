const db = require('../config/db.config');


const UserModel = {
    //Insert role patient
    createPatient : (data, callback) => {
        const query =  `INSERT INTO user (fname, lname, birth_at, email, password, phone, sexe, role, zip_code, adress, city) VALUES (?,?,?,?,?,?,?,?,?,?,?)`
        db.query(
           query, 
           [data.fname,data.lname,data.birth_at, data.email, data.password, data.phone, data.sexe, data.role, data.zip_code, data.adress, data.city],
           callback
            );   
    }, 
    //Insert role medecin
    createMedecin : (data, callback) => {
        
        db.query(
            `INSERT INTO user (fname, lname, birth_at, email, password,active_code, etablishment, phone, sexe, role, zip_code, adress, city)`
        );   
    }, 
    // méthode pour trouver le user via l'email lors du login
    findByEmail : (data, callback) => {
        const query = `SELECT * FROM user WHERE email = ?`
        db.query(query,[data.email], callback)
    }
 
};
module.exports = UserModel