Object.prototype.log = function () {
    // this aqui hace referencia a su objeto contenedor
    // es decir a Object
    // cabe decir que todo hereda de la clase Object, incluso arrays, strings y numbers
    console.log(this)
}

const x  = { a: 1 }

x.log()

if(String.prototype.trim) {
    String.prototype.trim = function(){
        try {
            return this.replace(/^\s+|\s+$/g, "")
        } catch {
            return this
        }
    }
}

const y = '    alla    '.trim()
y.log()