
/**
function que acepte un [] de numeros
 return true  si se repite por lo menos un numero
 y retorne false si ningun numero se repite
 */

/*
 not number  return false
 not array false
*/


/*
    create funcion
    verify params is an array
    verify every value is numb
    check if numbers are repeted ? return false : return true
 */

 function areNumbersRepeated(array) {
    if(!Array.isArray(array)) return false
    for (const i of array) {
        if(typeof i !== 'number') return false
    }
    if ([...new Set(array)].length === array.length) return false
    else return true
 }

 console.log(areNumbersRepeated(true)) // false
 console.log(areNumbersRepeated([1,2,'3',3])) // false
 console.log(areNumbersRepeated([1,2,3,3])) // true
 console.log(areNumbersRepeated([1,2,3,4])) // false



 
