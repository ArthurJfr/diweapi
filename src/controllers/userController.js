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
        const dateBirth = new Date(birth_at);
        const dateBirthAt = dateBirth.toISOString().slice(0, 19).replace('T', ' ');
    const hashedPassword = await bcrypt.hash(password, 10);
   // const hashedFname = await bcrypt.hash(fname, 10);
   // const hashedRole = await bcrypt.hash(role, 10);
   // const hashedEmail = await bcrypt.hash(email, 10);
   // const hashedPhone = await bcrypt.hash(phone, 10);
   // const hashedZip = await bcrypt.hash(zip_code, 10);
   // const hashedAdress = await bcrypt.hash(adress, 10);
   // const hashedCity = await bcrypt.hash(city, 10);
  //  const hashedLname = await bcrypt.hash(lname, 10);
  //  const hashedEtab = await bcrypt.hash(etablishment, 10);


        if(role == 'medecin') {
                let active_code = '';
                for (let i = 0 ; i < 6;  i++) {
                        active_code += Math.floor(Math.random() * 10).toString();
                }


                const newMedecin = {
                        fname,
                        lname,
                        email,
                        password: hashedPassword,
                        birth_at: dateBirthAt,
                        phone,
                        sexe,
                        role,
                        zip_code,
                        adress,
                        city,
                        etablishment
                    };
                    UserModel.createMedecin(newMedecin);

        } else if (role == 'patient'){

                const newPatient = {
                        fname,
                        lname,
                        email,
                        password: hashedPassword,
                        birth_at: dateBirthAt,
                        phone,
                        sexe,
                        role,
                        zip_code,
                        adress,
                        city
                        
                    };
        }
        
    
       // console.log(str);
       res.status(200).send({dateBirthAt});
           } catch (err) {
            console.log(err);
            res.status(500).send("An error occured");
           }
   

    
    
  
}

