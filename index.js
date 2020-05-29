const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());

const info = {
   name: 'Juan Felipe',
};

const users = [
   {
      user: 'Test',
      password: 'test',
   },
   {
      user: 'Prueba',
      password: 'prueba',
   },
   {
      user: 'Validar',
      password: 'validar',
   },
];

const signature = 'my_secret_password';
// console.log(token);
// Outputs encryption algorithm: Specific, encrypted word that can be decrypted using a key

// Verify signature
// const decoded = jwt.verify(token, signature);
// console.log(decoded);

const jwtMiddleware = (req, res, next) => {
   const { user, password } = req.body;
   const validated = validateUserPassword(user, password);
   if (validated) {
      next();
   } else {
      res.status(401).json({ error: 'Invalid credentials' });
   }
};

const validateUserPassword = (user, password) => {
   let valid = false;
   users.map((existingUser) => {
      if (existingUser.user == user && existingUser.password == password) {
         valid = true;
      }
   });
   return valid;
};


const userAutenticate = (req, res, next) => {
   try {
      const token = req.headers.authorization.split(' ')[1];
      const verificarToken = jwt.verify(token, signature);
      if (verificarToken){
         req.usuario = verificarToken;
         return next();
      }
   }catch(err){
      res.json({ error: 'Error al validar usuario'});
   }
};


server.post('/login', [jwtMiddleware], (req, res) => {
   const { user, password } = req.body;

   res.json({ token: jwt.sign(user, signature) });
});

server.get('/secure', userAutenticate, (req, res) => {
   res.send(`Esta es una página autenticada. Hola ${req.usuario}`);
})


server.listen(3000, () => {
   console.log('Server running...');
});
