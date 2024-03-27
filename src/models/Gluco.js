const db = require('../../config/db.config');


const GlucoModel =   {
    ScanInsert : (data, callback) => {
        const query = `INSERT INTO glucdata (glyc, status, scan_at, id_user) VALUES (?,?,?,?)`;
        db.query(query, [data.glyc, data.status, data.scan_at, data.id_user], callback);
    },
    getLastScan : (data, callback) => {
        const query = `SELECT * FROM glucdata WHERE id_user = ? ORDER BY id DESC LIMIT 1`;
        db.query(query, [data.id_user], callback);
    },
    getAllScan : (data, callback) => {
        const query = `SELECT * FROM glucdata WHERE id_user = ?`;
        db.query(query, [data.id_user], callback);

    }
}
module.exports = GlucoModel