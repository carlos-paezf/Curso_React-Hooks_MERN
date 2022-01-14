const arreglo = [1, 2, 3, 4]


let arreglo2 = [...arreglo]
arreglo2 = [...arreglo2, 5]


const arreglo3 = arreglo2.map(e => e * 3)


console.log(arreglo)        // [1, 2, 3, 4]
console.log(arreglo2)       // [1, 2, 3, 4, 5]
console.log(arreglo3)       // [3, 6, 9, 12, 15]