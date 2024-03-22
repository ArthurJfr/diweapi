const bcrypt = require('bcrypt');
const UserModel = require('../models/User');



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

            const {fname, lname, birth_at, email, password, phone, sexe, role, zip_code, adress, city, etablishment}  = req.body
            res.status(200).send("ok");

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedFname = await bcrypt.hash(fname, 10);
    const hashedRole = await bcrypt.hash(role, 10);
    const hashedEmail = await bcrypt.hash(email, 10);
    const hashedPhone = await bcrypt.hash(phone, 10);
    const hashedZip = await bcrypt.hash(zip_code, 10);
    const hashedAdress = await bcrypt.hash(adress, 10);
    const hashedCity = await bcrypt.hash(city, 10);
    const hashedLname = await bcrypt.hash(lname, 10);
    const hashedEtab = await bcrypt.hash(etablishment, 10);
        const str = 0
        for (let i = 0 ; i < 6;  i++) {
                str += Math.random(9);
        }
        console.log(str.toString());
     

        if(role == "patient") {
           // UserModel.createPatient({
            //    fname : hashedFname, lname : hashedLname, password : hashedPassword, hashedEmail, role : hashedRole, phone, hashedPhone, zip_code : hashedZip, adress : hashedAdress , city : hashedCity, birth_at, sexe
         //   })
        } else if(role == "medecin") {
          //  UserModel.createMedecin({
           //     fname : hashedFname, lname : hashedLname, password : hashedPassword, hashedEmail, role : hashedRole, phone, hashedPhone, zip_code : hashedZip, adress : hashedAdress , city : hashedCity,
          //  }) 

        }
           } catch (err) {
            console.log(err);
           }
   

    
    
  
}

