import { getImagen } from "../../base/11-async-await"

describe('Pruebas de async y await', () => {
    test('Debería de retornar el url de la imagen', async () => {
        const url = await getImagen()

        expect(typeof url).toBe('string')
        expect(url.includes('https://')).toBe(true)
    })
    
})
