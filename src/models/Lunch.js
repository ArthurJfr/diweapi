const db = require('../../config/db.config');


const LunchModel = {

            createLunch : (data, callback) => {
        const query =  `INSERT INTO lunch (id_user, period) VALUES (?,?)`
        db.query(
           query, 
           [data.id, data.period],
           callback
            );   
    }, 
        UpdateLunch : (data, callback) => {
        const query =  `UPDATE lunch SET meal = ?, qty = ?, modified_at = ? WHERE id_user = ? AND period = ?`
        db.query(
           query, 
           [data.meal, data.qty, data.modified_at, data.id_user, data.period],
           callback
            );   
    }, 

}

module.exports = LunchModel