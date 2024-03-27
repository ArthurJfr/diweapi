const GlucoModel = require("../models/Gluco");

exports.onScan = async (req, res) => {
    try {
        if (req.user) {
            const {glyc} = req.body;
            const id_user = req.user.id;
            const scan_at = new Date();
            const status = "mg/dL";
            GlucoModel.ScanInsert({glyc, status, scan_at, id_user}, (err, result) => {
                if (err) {
                    res.status(400).send(err);
                }else {
                    res.status(200).send('insert ok')
                }
            })
        }
    } catch(err) {
        res.status(500).send(err);
    }
}
exports.getLastScan = async (req, res) => {
        try {
        const id_user = req.user.id
        GlucoModel.getLastScan({id_user}, (err, data) => {
            if(err) {
                res.status(404).send(err)
            } else {
                res.status(200).send(data);
            }
        });
    } catch(err) {
        res.status(500).send(err);
    }
}
exports.getAllScan = async (req, res) => {
        try {
        const id_user = req.user.id
        GlucoModel.getAllScan({id_user}, (err, data) => {
            if(err) {
                res.status(404).send(err)
            } else {
                res.status(200).send(data);
            }
        });
    } catch(err) {
        res.status(500).send(err);
    }
}
