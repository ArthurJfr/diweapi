const DosageModel = require("../models/Dosage");


exports.updateDosage = async (req, res) => {
    try {   
        if(req.user) {
            const { id, email} = req.user;
            const {dose, period} = req.body;
            switch(period) {
                case "matin" :
                    DosageModel.UpdateDosageMatin({dose, id}, (err, result) => {
                    if(err) {
                    res.status(500).send(err)
                    } else {res.status(200).send(result)}
                    })
                break;
                case "midi" :
                    DosageModel.UpdateDosageMidi({dose, id}, (err, result) => {
                    if(err) {
                    res.status(500).send(err)
                    } else {res.status(200).send(result)}
                    })
                    break;
                case "soir" :
                    DosageModel.UpdateDosageSoir({dose, id}, (err, result) => {
                    if(err) {
                    res.status(500).send(err)
                    } else {res.status(200).send(result)}
                    })
                 break;
            }

        }
        
           
    } catch (err) {
        res.status(500).send(err)
    }
}
exports.getAllDosage = async (req, res) => {
    try {
        console.log(req.user.id);
        const id_user = req.user
        DosageModel.getAllDosage({id_user : id_user.id}, (err, result) => {
            if(err) {
                res.status(404).send(err)
            } else {
                res.status(200).send(result);
            }
        });
    } catch(err) {
        res.status(500).send(err);
    }
}