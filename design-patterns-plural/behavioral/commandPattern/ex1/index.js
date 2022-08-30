const Commander = (() => {
    // hidden methods
    const o = {
        comprar: x => {
            console.log(`Comprando ${x}`)
        },
        vender: x => {
            console.log(`Vendiendo ${x}`)
        },
    }

    // visible methods
    return {
        run: (comando, argumentos) => {
            // if not
            if (!o[comando]) {
                console.log('este comando no existe')
                return
            }

            //if yes
            o[comando](argumentos)

        }

    }
})()

// IIFE
// (function(){
//     console.log('holo')
// })()

// declara y ejecuta
// function autoejecutar() {
//     return console.log('holo')
// }
// autoejecutar() // 'holo'



//commander.route('controller', 'parametros')
Commander.run('vender', 'pizza')
Commander.run('comprar', 'piña')
Commander.run('robar', 'piña')
// console.log(Commander.o)