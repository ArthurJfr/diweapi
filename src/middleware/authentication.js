const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
 const pathToPrivateKey = path.join(__dirname,'../..', 'config', 'jwt', 'private_key.pem');
const PRIVATE_KEY = fs.readFileSync(pathToPrivateKey, 'utf8');

const pathToPublicKey = path.join(__dirname,'../..', 'config', 'jwt', 'public_key.pem');
const PUBLIC_KEY = fs.readFileSync(pathToPublicKey, 'utf8');

const authenticationJwt = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Généralement sous la forme "Bearer TOKEN"
console.log(token);
  if (token == null) return res.sendStatus(401); // Pas de token fourni

  jwt.verify(token,  PUBLIC_KEY, { algorithms: ['RS256'] }, (err, user) => {
    if (err) return res.sendStatus(403); // Token invalide ou expiré
    req.user = user;
    next(); // Passe à la prochaine fonction middleware
  });
};

module.exports = authenticationJwt;