/** Pruebas tecnicas */
function incremento(){
    let a = 0;
    console.log(a++); // 0 (primero imprime, luego incrementa)
    // en este punto, a == 1
    console.log(++a); // 2 (primero incrementa y luego imprime)
}
incremento();




function scope1(){
    const obj01 = {
        name: 'chava'
    }
    obj01.name = 'alex'; // a pesar de que el objeto es un const, puede modificarse su contenido pero no por asignación
    console.log(obj01.name); // alex
}
scope1();




function varGlobalAcc(){
    let varA = varB = 0; // varB, al no tener tipo de variable, se hace global "por accidente".
    return varA;
}
var varC = varGlobalAcc();
console.log(typeof(varA)); // undefined
console.log(typeof(varB)); // number
console.log(typeof(varC)); // number




hoisting01(); // funcion normal llamada antes de ser definida.
function hoisting01(){
    console.log("Esta es una funcion normal.");
} // se ejecuta con normalidad

//hoisting02(); // funcion flecha llamada antes de ser definida, el hoisting no la toma en cuenta.
const hoisting02 = () => {
    console.log("Esta es una funcion flecha.")
}; // error: Cannot access 'hoisting02' before initialization





function coercion01(){
    let xx = '1';
    let yy = 2;
    console.log( xx + yy); // 12 -> al sumar, se concatenan los valores como texto
    console.log( xx - yy); // -1 -> al restar, los valores se manejan como números.

}
coercion01();




function truthy01(){
    console.log(Boolean("0")); // true
    console.log(Boolean(() => 0)); // true
    console.log(Boolean("a")); // true
    console.log(Boolean("false")); // true
    console.log(Boolean(-0)); // false
    console.log(Boolean([])); // true
    console.log(Boolean("")); // false
    console.log(Boolean(0)); // false
    console.log(Boolean({})); // true
    console.log(Boolean(null)); // false
    console.log(Boolean(true)); // true
}
truthy01();






function printFor(){
    for(var i=0; i<10; i++){ // al ser var, la variable se sale del for, si fuera let, se imprimirían los numeros del 0-9
        setTimeout(() => {
            console.log(i); // se imprimen 10 veces el 10, por el tiempo que tarda el procesador en hacer el ciclo 'for'
        }, 1000);
    }
}
printFor();




const accesToThis = {
    name: 'Adrian',
    saludar: function () {
        console.log('Hola' + this.name);
    }
}
accesToThis.saludar()
