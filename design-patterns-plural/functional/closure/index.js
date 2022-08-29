// function sin closure
const f1 = () => {
    const x = 'alalla'
    console.log(x)
}
f1()
// console.log(x) // x not defined // lexical scope

// function sin closure
const y = 'lele'
const f2 = () => {
    const x = 'alalla'
    console.log(x, y)
}
f2()
console.log(y)