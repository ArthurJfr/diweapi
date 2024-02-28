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
