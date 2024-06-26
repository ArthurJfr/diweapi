const db = require('../../config/db.config');


const DosageModel = {

            createDosage : (data, callback) => {
        const query =  `INSERT INTO dosage (id_patient) VALUES (?)`
        db.query(
           query, 
           [data.id],
           callback
            );   
    }, 
        UpdateDosageMatin : (data, callback) => {
        const query =  `UPDATE dosage SET matin = ? WHERE id_patient = ?`
        db.query(
           query, 
           [ data.dose, data.id],
           callback
            );   
    }, 
            UpdateDosageMidi : (data, callback) => {
        const query =  `UPDATE dosage SET midi = ? WHERE id_patient = ?`
        db.query(
           query, 
           [ data.dose, data.id],
           callback
            );   
    }, 
            UpdateDosageSoir : (data, callback) => {
        const query =  `UPDATE dosage SET soir = ? WHERE id_patient = ?`
        db.query(
           query, 
           [ data.dose, data.id],
           callback
            );   
    }, 
        UpdateDosageCollation : (data, callback) => {
        const query =  `UPDATE dosage SET collation = ? WHERE id_patient = ?`
        db.query(
           query, 
           [ data.dose, data.id],
           callback
            );   
    }, 
    DeleteAllDosage : (data, callback) => {
        const query = `UPDATE dosage SET matin = null, midi = null, soir = null WHERE id_patient = ?`
        db.query(query, [data.id_user], callback);
    },
            getAllDosage : (data, callback) => {
        const query =  `SELECT * FROM dosage WHERE id_patient = ? `;
        db.query(
           query, 
           [data.id_user],
           callback
            );   
    }


}

module.exports = DosageModel