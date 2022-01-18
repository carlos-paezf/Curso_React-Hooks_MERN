describe('Prubeas en el archivo demo.test.js', () => {
    test('Los strings deben ser iguales', () => {
        //? 1. Inicialización
        const mensaje1 = 'Hola mundo'

        //? 2. Estimulo
        const mensaje2 = `Hola mundo`

        //? 3. Observar el comportamiento
        expect(mensaje2).toBe(mensaje1)
    })
})
