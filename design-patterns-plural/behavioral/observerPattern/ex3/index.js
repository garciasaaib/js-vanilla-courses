const user = new User()

const init = () => {
    user.on('login', userLoginIn)
}

const userLoginIn = () => {
    // usuario inició sesion
}

app.init()

const login = () => {
    // logica de inicio de sesión...
    // ...

    // luego : 
    user.triger('login')
}

login()