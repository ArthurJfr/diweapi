const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const dbConnection = require('./src/config/db.config')


// ne pas mettre db_user dans .env car problèmes
dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//api json
app.use(express.json());


// path des routes users
const userRoutes = require('./src/routes/userRoutes');
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
    res.status(404).send('route introuvable');
});

const PORT = process.env.PORT || 3000; //penser à retirer "|| 3000"
app.listen(PORT, () => {
    console.log("Server started on ${PORT}");
})