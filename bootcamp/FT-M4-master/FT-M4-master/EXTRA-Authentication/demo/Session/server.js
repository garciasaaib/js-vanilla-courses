const express = require('express');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');

const app = express();

const users = [
  {id: 1, name: 'Franco', email: 'Franco@mail.com', password: '1234'},
  {id: 2, name: 'Toni', email: 'Toni@mail.com', password: '1234'}
]

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// El orden es importante, el cookieparser debe estar antes de la utilización del session
app.use(cookieparser());

app.use(session(
  {
    name: 'sid',
    secret:'secret', // Debería estar en un archivo de environment
    resave:false,
    saveUninitialized:false,
    cookie:{
      maxAge: 1000 * 60 * 60 * 2 // Está en milisegundos --> 2hs
    }
  }
));

app.use((req, res, next) => {
  console.log(req.session);
  next();
});

const redirectLogin = (req, res, next) => {
  if(!req.session.userId) {
    res.redirect('/login');
  } else {
    next();
  }
}

const redirectHome = (req, res, next) => {
  if(req.session.userId) {
    res.redirect('/home');
  } else {
    next();
  }
}

app.get('/', (req, res) => {
  const { userId } = req.session;

  res.send(`
    <h1>Bienvenidos a Henry!</h1>
    ${userId ? `
      <a href='/home'>Perfil</a>
      <form method='post' action='/logout'>
        <button>Salir</button>
      </form>
      ` : `
      <a href='/login'>Ingresar</a>
      <a href='/register'>Registrarse</a>
      `}
  `)
});

app.get('/home', redirectLogin, (req, res) => {
  const user = users.find(user => user.id === req.session.userId);

  res.send(`
    <h1>Bienvenido ${user.name}</h1>
    <h4>${user.email}</h4>
    <a href='/'>Inicio</a>
  `)
});

app.get('/login', redirectHome,  (req, res) => {
  res.send(`
    <h1>Iniciar sesión</h1>
    <form method='post' action='/login'>
      <input type='email' name='email' placeholder='Email' required />
      <input type='password' name='password' placeholder='Contraseña' required />
      <input type='submit' />
    </form>
    <a href='/register'>Registrarse</a>
  `)
});

app.get('/register', redirectHome, (req, res) => {
  res.send(`
    <h1>Registrarse</h1>
    <form method='post' action='/register'>
      <input name='name' placeholder='Nombre' required />
      <input type='email' name='email' placeholder='Email' required />
      <input type='password' name='password' placeholder='Contraseña' required />
      <input type='submit' />
    </form>
    <a href='/login'>Iniciar sesión</a>
  `)
});

app.post('/login', redirectHome, (req, res) => {
  const { email, password } = req.body;

  if(email && password) {
    const user = users.find(user => user.email === email && user.password === password);
    if(user) {
      req.session.userId = user.id;
      return res.redirect('/home')
    }
  }

  res.redirect('/login')
});

app.post('/register', redirectHome, (req, res) => {
  const { name, email, password } = req.body;

  if(name && email && password) {
    const exists = users.some(user => user.email === email);
    if(!exists) {
      const user = {
        id: users.length + 1,
        name,
        email,
        password
      }
      users.push(user);
      return res.redirect('/');
    }
  }

  res.redirect('/register')
});

app.post('/logout', redirectLogin, (req, res) => {
  req.session.destroy(err => {
    if(err) {
      return res.redirect('/home');
    }
    res.clearCookie('sid');
    res.redirect('/');
  })
});

app.listen(3000, (err) => {
  if(err) {
   console.log(err);
 } else {
   console.log('Listening on localhost:3000');
 }
});
