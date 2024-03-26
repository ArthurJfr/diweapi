const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const jwt= require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { log } = require('console');
const LunchModel = require('../models/Lunch');

const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '../..','config', 'jwt', 'private_key.pem'), 'utf8');
exports.test = async (req, res) => {
    try {
     res.status(200).send("okokokokok");
    } 
    catch (err) {
     res.status(200).send("nonono");
    }
 }
function convertDateToMySQLFormat(dateString) {
    const parts = dateString.split('-');
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return `${formattedDate} 00:00:00`;
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
                        fname ,
                        lname ,
                        email,
                        password: hashedPassword,
                        phone,
                        sexe,
                        role,
                        zip_code,
                        adress,
                        city,
                        etablishment,
                        active_code
                    };
                    UserModel.createMedecin({fname ,lname ,email, password: hashedPassword, phone, sexe, role, zip_code, adress,city, etablishment, active_code}, (err, result) => {
                        if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(201).send({ id: result, message: "Inscription réussie" });
                }
                    } );

        } else if (role == 'patient'){

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
                            LunchModel.createLunch({id : iduser.insertId, period : "midi"}, (err,result) => {if(err){console.log('error create breakfast')}});
                            LunchModel.createLunch({id : iduser.insertId, period : "soir"}, (err,result) => {if(err){console.log('error create breakfast')}});
                            LunchModel.createLunch({id : iduser.insertId, period : "collation"}, (err,result) => {if(err){console.log('error create breakfast')}});
                            LunchModel.createLunch({id : iduser.insertId, period : "collation"}, (err,result) => {if(err){console.log('error create breakfast')}});
                            LunchModel.createLunch({id : iduser.insertId, period : "collation"}, (err,result) => {if(err){console.log('error create breakfast')}});

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
                        id: user.id,
                        email: user.email
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

