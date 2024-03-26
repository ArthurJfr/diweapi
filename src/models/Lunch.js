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

}

module.exports = LunchModel