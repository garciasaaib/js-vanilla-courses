# Cookie Authentication Homework

## Descripción

En esta homework se pondrán a prueba las conocimientos básicos de autenticación mediante la implementación de un servidor que contendrá solamente cuatro pantallas:

  * Inicio
  * Login
  * Registro
  * Home

## Configuración inicial

```bash
  npm install
  npm start
```

Abrir [http://localhost:3000/](http://127.0.0.1:3000/) para comenzar a utilizar la app.

*Inicialmente al no tener implementadas algunas de las rutas y funcionalidades básicas solo podrán acceder a la pantalla de inicio*

## Instrucciones

### Datos de usuarios

En este caso en particular la información de los usuarios no va a estar almacenada en una base de datos como sería lo habitual sino que para simplificar la homework se va a utilizar un array en memoria en el servidor. Inicialmente van a tener creados dos usuarios de ejemplo pero son libres de modificarlos o agregar nuevos:

```js
const users = [
  {id: 1, name: 'Franco', email: 'Franco@mail.com', password: '1234'},
  {id: 2, name: 'Toni', email: 'Toni@mail.com', password: '1234'}
]
```

### Middleware para visualizar la cookie

Para poder hacer un seguimiento de la cookie y los datos almacenados en ella vamos a definir un middleware que será ejecutado previo a cada request recibido por el servidor:

```js
app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

```

Recordar que al aplicar el `use` sin especificar ninguna ruta será aplicado a todas y por otro lado que es necesario hacer el llamado a `next()` para que avance al request correspondiente y no se quede tildado en el middleware.

*Hasta no setear la cookie correspondiente no vamos a poder obtener información en el console.log*

### Configuración del cookie-parser

Existe un middleware ya implementado conocido como `cookie-parser` que nos va a permitir justamente parsear los datos de la cookie enviada dentro del header de los request HTTP y agregarlo dentro del objeto `req`, particularmente en un atributo llamado `req.cookies`.

 1. Instalar el middleware:
 ```bash
 npm install --save cookie-parser
 ```
 2. Importar el middleware:
 ```js
 const cookieparser = require('cookie-parser');
 ```
 3. Aplicar el middleware a todos los request:
 ```js
 app.use(cookieparser());
 ```

En este punto si refrescamos la página inicial o volvemos a ingresar veremos que el `console.log` previo que antes nos devolvía `undefined` ahora va a mostrar un objeto vacío debido a que el `cookie-parser` intenta parsear la cookie pero como no hay nada seteado aún muestra simplemente el objeto vacío.


### Pantalla inicial: GET /

Ahora vamos a modificar el html devuelto por el `GET` a `/` para que muestre los botones de 'Ingresar' y 'Registrarse' en el caso de que no esté logueado o un botón de 'Salir' caso contrario:

```js
app.get('/', (req, res) => {
  res.send(`
    <h1>Bienvenidos a Henry!</h1>
    ${req.cookies.userId ? `
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
```

Observar que nos basamos en la cookie del `req` y más particularmente en el id del usuario para determinar si hay alguien logueado o no.

Por el momento hasta no implementar la funcionalidad de login deberían ver algo así:

<p align="center">
  <img src="./img/1.png" />
</p>

### Pantalla de Registro: GET /register

Como se habrán dado cuenta en la pantalla inicial si hacemos click en 'Registrarse' nos redirige a `/register` pero aun no tenemos implementada la ruta GET que devuelva el HTML que debemos renderizar en ese caso. En esta pantalla armaremos un formulario para completar nombre, mail y contraseña:

```js
app.get('/register', (req, res) => {
  res.send(`
    <h1>Registrarse</h1>
    <form method='post' action='/register'>
      <input name='name' placeholder='Nombre' required />
      <input type='email' name='email' placeholder='Email' required />
      <input type='password' name='password' placeholder='Contraseña' required />
      <input type='submit' value='Registrarse' />
    </form>
    <a href='/login'>Iniciar sesión</a>
  `)
});
```

### Pantalla de Login: GET /login

Como se habrán dado cuenta en la pantalla inicial si hacemos click en 'Ingresar' nos redirige a `/login` pero aun no tenemos implementada la ruta GET que devuelva el HTML que debemos renderizar en ese caso. En esta pantalla armaremos un formulario para completar mail y contraseña:

```js
app.get('/login',  (req, res) => {
  res.send(`
    <h1>Iniciar sesión</h1>
    <form method='post' action='/login'>
      <input type='email' name='email' placeholder='Email' required />
      <input type='password' name='password' placeholder='Contraseña' required />
      <input type='submit' value='Ingresar' />
    </form>
    <a href='/register'>Registrarse</a>
  `)
});
```

---

<h2 align="center" style="color: #9f9f09; font-weight: bold;"> ¡Empieza lo divertido! </h2>

<p align="center">
  <img src="./img/2.jpg" />
</p>

---

### POST /login

¿No era de autenticación la homework? ¡Ahora si! Implementemos el POST para procesar los datos enviados por el formulario de login que recién definimos. Si observan al incluir el `method='post action='/login` dentro de dicho formulario, al hacer click en el botón de `Ingresar` se va a disparar un request del tipo POST a `/login`. Para poder parsear la información recibida necesitamos utilizar como middleware el método nativo de express `express.urlencoded()`

1. Aplicar el middleware a todos los request configurando en particular para este caso (URL-encoded requests):

```js
app.use(express.urlencoded({ extended: true }));
```

4. Completar el POST a /login:

```js
app.post('/login', (req, res) => {
  // 1) Obtener el email y password desde el body del request
  // 2) Verificar que ambos datos hayan sido provistos
  // Si ambos datos fueron provistos:
  //   a) Obtener del listado de usuarios (si existe) el que tenga dicho email y contraseña
  //   b) Guardar los datos del usuario en la cookie: res.cookie('userId', user.id) donde el primer
  //   parámetro es el nombre de la cookie y el segundo su valor
  //   c) Redirigir a /home
  // En el caso de que no exista un usuario con esos datos o directamente no se hayan provisto o
  // el email o la password, redirigir a /login
});
```

### Pantalla de Home: GET /home

Para aquellos usuarios logueados vamos a crear la pantalla de 'Home' que muestre su nombre y email (Completar la parte faltante):

```js
app.get('/home', (req, res) => {
  const user = //Completar: obtener el usuario correspondiente del array 'users' tomando como
              //            referencia el id de usuario almacenado en la cookie

    res.send(`
    <h1>Bienvenido ${user.name}</h1>
    <h4>${user.email}</h4>
    <a href='/'>Inicio</a>
  `)
});
```

### POST /register

Debemos también agregar funcionalidad al post de /register para poder crear nuevos usuarios:

```js
app.post('/register', (req, res) => {
  // 1) Obtener el name, email y password desde el body del request
  // 2) Verificar que los tres datos hayan sido provistos
  // Si todos los datos fueron provistos:
  //   a) Buscar dentro del listado de usuarios si existe alguno que tenga dicho email para evitar
  //      que existan dos usuarios con mismo mail
  //   b) Crear un nuevo objeto con los datos del usuario y pushearlo al array de users
  //   c) Redirigir a la pantalla inicial '/'
  // En el caso de que ya exista un usuario con ese email o no se hayan provisto o
  // el name o el email o la password, redirigir a /register
});
```

### POST /logout

Adicionalmente debemos tener una forma de poder desloguearnos, para ello es necesario borrar la cookie donde tenemos actualmente guardada la información del usuario:

```js
app.post('/logout', (req, res) => {
  res.clearCookie('userId');
  res.redirect('/');
});
```

---

<h2 align="center" style="color: #9f9f09; font-weight: bold;"> Recalculando... </h2>

<p align="center">
  <img src="./img/3.jpg" />
</p>

---

__A esta altura de la homework ya deberíamos poder:__

 - Ingresar con un usuario existente
 - Crear un nuevo usuario
 - Ver los datos del usuario logueado en la pantalla de home
 - Cerrar sesión

 ---

 <p align="center">
   <img src="./img/4.jpeg" />
 </p>

 ---

 <h2 align="center" style="color: #9f9f09; font-weight: bold;"> Pero todavía falta... </h2>

 <p align="center">
   <img width=250 src="./img/5.jpg" />
 </p>

 ---

### Protección de rutas

Por útlimo debemos proteger las rutas a las cuales un usuario NO logueado no debería poder acceder o incluso a aquellas a las que alguien logueado no deba tener acceso.

Para eso vamos a definir dos middleware propios:

  * __isAuthenticated:__
  ```js
  const isAuthenticated = (req, res, next) => {
    // Si NO hay un usuario logueado redirigir a /login de lo contrario llamar a next()
  }
  ```

  * __isNotAuthenticated:__
 ```js
 const isNotAuthenticated = (req, res, next) => {
   // Si hay un usuario logueado redirigir a /home de lo contrario llamar a next()
 }
 ```

Ahora debemos aplicar esos middleware a las rutas que corresponda, por ejemplo sólo los usuarios logueados deberían poder ingresar al `/home` por lo que le agregaremos el middleware `isAuthenticated` a dicha ruta:

```js
app.get('/home', isAuthenticated, (req, res) => {
  const user = users.find(user => user.id == req.cookies.userId);

  res.send(`
    <h1>Bienvenido ${user.name}</h1>
    <h4>${user.email}</h4>
    <a href='/'>Inicio</a>
  `)
});

```

Completar la protección de las rutas faltantes siempre y cuando corresponda protegerlas.

---

<p align="center">
  <img src="./img/6.jpeg" />
</p>

---
