var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');


// Configuración de estrategia local de Passport.

// Para configurar la estrategia local de Passport es necesario crear una nueva instancia
// de Strategy pasándole como parámetro una función ("Verify Callback") que reciba las credenciales del usuario
// (Usuario y contraseña) y una función que suele definirse como "done" que debe ser invocada
// de distintas formas según si las credenciales son válidas o no:
//  - Si las credenciales son validas --> done(null, user) (Donde user es el objeto conteniendo los datos del usuario)
//  - Si las credenciales son invalidas --> done(null, false)
//  - Si hubo un error durante la ejecución de esta función --> done(err)

passport.use(new Strategy(
  function(username, password, done) {
    db.users.findByUsername(username)
      .then((user) => {
        if(!user) {
          return done(null, false);
        }
        if(user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      })
    .catch(err => {
      return done(err);
    })
  }));


// Configuración de la persistencia de la sesión autenticada

// Para recuperar los datos de la sesión autenticada Passport necesita dos métodos para
// serializar y deserializar al usuario de la sesión. Para ello la forma más práctica de hacerlo
// es serializando el ID del usuario para luego al deserealizar a partir de dicho ID obtener
// los demás datos de ese usuario. Esto permite que la información almacenada en la sesión sea
// lo más simple y pequeña posible

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Al deserealizar la información del usuario va a quedar almacenada en req.user

passport.deserializeUser(function(id, done) {
  db.users.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch(err => {
      return done(err);
    })
});


var app = express();

// Configuración del view engine para rendererizar templates de EJS.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Inicializa Passport y recupera el estado de autenticación de la sesión.
app.use(passport.initialize());
app.use(passport.session());

// Middleware para mostrar la sesión actual en cada request
app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});


app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

app.get('/login',
  function(req, res){
    res.render('login');
  });

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
}

app.get('/profile',
  isAuthenticated,
  function(req, res){
    res.render('profile', { user: req.user });
  });

app.listen(3000);
