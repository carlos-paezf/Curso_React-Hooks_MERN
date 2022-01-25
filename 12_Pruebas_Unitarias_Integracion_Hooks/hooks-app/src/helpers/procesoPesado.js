/**
 * @param iteraciones - The number of times to run the loop.
 * @returns The number of iterations.
 */
export const procesoPesado = (iteraciones) => {
    for (let i = 0; i < iteraciones; i++) {
        console.log(`Realizando Iteración`)
    }
    return `${iteraciones} iteraciones realizadas`
}