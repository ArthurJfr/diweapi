const jwt = require('jsonwebtoken');
 

const authenticationJwt = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Généralement sous la forme "Bearer TOKEN"

  if (token == null) return res.sendStatus(401); // Pas de token fourni

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token invalide ou expiré
    req.user = user;
    next(); // Passe à la prochaine fonction middleware
  });
};

module.exports = authenticationJwt;