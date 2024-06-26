const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const jwt= require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const LunchModel = require('../models/Lunch');
const DosageModel = require('../models/Dosage');

const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '../..','config', 'jwt', 'private_key.pem'), 'utf8');
exports.test = async (req, res) => {
    try {
     res.status(200).send("okokokokok");
    } 
    catch (err) {
     res.status(200).send("nonono");
    }
 }

exports.register = async (req, res) => {
    try {

    const {fname, lname, email, password, phone, sexe, role, zip_code, adress, city, etablishment}  = req.body
    const hashedPassword = await bcrypt.hash(password, 10);

        if(role == 'medecin') {
                let active_code = '';
                for (let i = 0 ; i < 6;  i++) {
                        active_code += Math.floor(Math.random() * 10).toString();
                }
                 newMedecin = {
                      fname,lname,email,password: hashedPassword,phone,sexe,role,zip_code,adress,city,etablishment,active_code
                    };
                    UserModel.createMedecin( newMedecin, (err, iduser) => {
                        if (err) {
                    res.status(500).send(err);
                    } 
                    else {
                        lastInsertId = iduser.insertId;
                        res.status(201).send({ lastInsertId , message: "Inscription réussie" });
                    }
                    });
        } 
        
        
        else if (role == 'patient'){

                const newPatient = {
                        fname,
                        lname,
                        email,
                        password: hashedPassword,
                        phone,
                        sexe,
                        role,
                        zip_code,
                        adress,
                        city
                        
                    };
                    UserModel.createPatient(newPatient, (err, iduser) => {
                        if(err) {
                    res.status(500).send(err);
                     console.log(err);


                        } else {
                       
                            LunchModel.createLunch({id : iduser.insertId, period : "matin"}, (err,result) => {if(err){console.log('error create breakfast')}});
                            LunchModel.createLunch({id : iduser.insertId, period : "midi"}, (err,result) => {if(err){console.log('error create midi')}});
                            LunchModel.createLunch({id : iduser.insertId, period : "soir"}, (err,result) => {if(err){console.log('error create soir')}});
                            LunchModel.createLunch({id : iduser.insertId, period : "collation_a"}, (err,result) => {if(err){console.log('error create col')}});
                            LunchModel.createLunch({id : iduser.insertId, period : "collation_b"}, (err,result) => {if(err){console.log('error create col')}});
                            LunchModel.createLunch({id : iduser.insertId, period : "collation_c"}, (err,result) => {if(err){console.log('error create col')}});
                            DosageModel.createDosage({id : iduser.insertId}, (err) => {if(err){console.log(err)}});
                    res.status(201).send({ id: iduser, message: "Inscription réussie" });
                     console.log(iduser.insertId);

                        }
                    })
        }
    } 
    catch (err) {
        console.log(err);
        res.status(500).send("An error occured");
        }
}

    exports.login = async (req, res) => {
        try {
            const { email, password } = req.body;
            UserModel.findByEmail({email}, async (err, user) => {
               // console.log(user);
                if (err) {
                    res.status(500).send(err);
                } else if (user[0]) {
                    const validPassword =  await bcrypt.compare(password, user[0].password);
                     if (validPassword) {
                        //  JWT
                    const tokenPayload = {
                        id: user[0].id,
                        email: user[0].email
                    };
                            const token = jwt.sign(tokenPayload, PRIVATE_KEY, { expiresIn: '24h' ,  algorithm: 'RS256'});
                        res.status(200).send({token});
                    } else {
                        res.status(401).send('Mot de passe incorrect');
                    }
                } else {
                    res.status(404).send('Utilisateur non trouvé');
                }
            });
        } catch (err) {
            res.status(500).send(err);
        }
    }
exports.changeReadData = async (req, res) => {
    try {
        if(req.user) {
            const id = req.user.id;
            UserModel.findById({id}, (err, data) => {
                if(err) {res.status(404).send(err)}
                else {
                    res.status(200).send(data[0].read_data);
                    if(data[0].read_data == 'mg/dL') {
                        const read_data = 'g/L';
                    } else if (data[0].read_data == 'mg/dL') {
                        const read_data = 'mg/dL';
                      
                    }
                      UserModel.updateReadData({read_data, id}, (err, result) => {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.status(200).send(result);
                            }
                        })
                }
            })
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.linkToPro = async (req, res) => {
    try {
        const {active_code , id_user, email} = req.body 
        if(active_code) {
            UserModel.findByCode({active_code}, (err, user) => {if(err){res.status(404).send('Médecin introuvable'); }
            else{
                console.log(user[0]);
                if(user[0]) 
                {
                    const idMed = user[0].id;
                    UserModel.linkToPro({id_user, idMed}, (err, result) => {
                        if(err) {res.status(500).send('Liaison avec médecin échoué')}
                        else  {
                            res.status(201).send(result)
                        }
                    });
                }

            }})


        }

    } catch(err) {
        res.status(500).send(err);
    }
}

