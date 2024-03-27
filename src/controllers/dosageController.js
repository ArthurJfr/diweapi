const DosageModel = require("../models/Dosage");


exports.updateDosageMatin = async (req, res) => {
    try {   
        if(req.user) {
            const { id, email} = req.user;
            const {dose} = req.body;
            console.log(req.user) ;
            DosageModel.UpdateDosageMatin({dose, id}, (err, result) => {
                if(err) {
                    res.status(500).send(err)
                } else {res.status(200).send(result)}
            });
        }
        
           
    } catch (err) {
        res.status(500).send(err)
    }
}