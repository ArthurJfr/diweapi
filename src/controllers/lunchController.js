const LunchModel = require("../models/Lunch");

exports.updateLunch = async (req, res) => {
    try {
        if(req.user) {
            const {period, meal, qty} = req.body
            const modified_at = new Date();
            const user = req.user
            console.log(modified_at);
            LunchModel.UpdateLunch({meal, qty, id_user : user.id , period, modified_at}, (err, result) => {
                if(err) {
                    res.status(500).send(err);
                }else {
                    res.status(200).send('Modification réussie');
                }
            })
        } else {res.status(500).send('Utilisateur non trouvé')}
    } catch(err) {
        res.status(500).send(err)
    }
}
exports.getAlllunch = async (req, res) => {
    try {
        const id_user = req.user.id
        LunchModel.getALlLunch({id_user}, (err, data) => {
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