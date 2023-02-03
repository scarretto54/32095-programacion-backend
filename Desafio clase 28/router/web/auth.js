require("dotenv").config({ path: "../config/.env" });
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const authWebRouter = require("express").Router();
const ContenedorArchivo = require("../../class/ContenedorArchivo.js");
const users_contenedor = new ContenedorArchivo('users.json')




/* ------------------ DATABASE -------------------- */

async function  getByUsername(username) {
  try {    
    const users = await users_contenedor.listarAll();    
    const match = users.find((user) => user.username === username)
    return match ? match : null;
  } catch (error) {
    throw new Error(
      `Error al obtener el usuario con username:'${username}': ${error}`
    );
  }
}

/* ------------------ PASSPORT REGISTER-------------------- */

passport.use('register', new LocalStrategy({
  passReqToCallback: true
}, async (req, username, password, done) => {
  try {
    const User = await getByUsername(username);
    if (User) {
      console.log("User already registered");
      return done(null, false);      
    }
    const { name, address, age, phone, avatar } = req.body;
    const user = {
      username,
      password,
      name,
      address,
      age,
      phone,
      avatar,
      role: "user",
    };
    
    users_contenedor.guardar(user);

    console.log(
      `Registration succesful with ID ${username}`
    );
    return done(null, user)
  } catch (err) {
    console.log(`Error al registrar el usuario: ${err}`);    
  }

}));


/* ------------------ PASSPORT LOGIN-------------------- */

passport.use('login', new LocalStrategy(async (username, password, done) => {

 const user = await getByUsername(username);

  if (!user) {
    return done(null, false)
  }

  if (user.password != password) {
    return done(null, false)
  }

  user.contador = 0

  return done(null, user);
}));

/* ---------------------PASSPORT SERIALIZER --------------------------- */

passport.serializeUser( async (user, done) => {  
  
  await done(null, user.username);
});

passport.deserializeUser( async (username, done) => {   
  const userscheck = await users_contenedor.listarAll(); 
    const user = userscheck.find(user => user.username === username)
    done(null, user);   
});


///


/* ---------------------PASSPORT ROUTES --------------------------- */

// REGISTER
  authWebRouter.get('/register', async (req, res) => {  
   return res.render("register.hbs");
  })
  
  authWebRouter.post('/register', passport.authenticate('register', {failureRedirect: '/register-error', failureMessage: true, successRedirect: '/login', }));

  
  authWebRouter.get('/register-error', (req, res) => {
    return res.render('error-register.hbs', {name: 'al registrarse', path: '/register'})
  })
  
  // LOGIN
  authWebRouter.get('/login', async (req, res) => {
     return res.render("login.hbs");    
  })
  
  
  authWebRouter.post('/login', passport.authenticate('login', {failureRedirect: '/login-error', failureMessage: true, successRedirect: '', }), async (req, res) => {
    let username = req.body.username;
    const users = await users_contenedor.listarAll();    
    const user = users.find((user) => user.username === username)
    req.session.user = user.name;
    console.log('usuario conectado')
    return res.redirect("/");  
  }
  );
  
  authWebRouter.get('/login-error', (req, res) => {
    return res.render('error-login.hbs', {name: 'e-mail y/o contraseña incorrectos', path: '/login'})
  })
  
  /* --------- LOGOUT ---------- */
  authWebRouter.get('/logout', (req, res) => {
    let name = req.session.user
    req.logout((err) => {
      if (!err) {
        res.render("goodbye.hbs", {name: name});
        console.log('usuario desconectado')
      } else res.send({ status: "Logout ERROR", body: err });
    });
  });

  module.exports = authWebRouter