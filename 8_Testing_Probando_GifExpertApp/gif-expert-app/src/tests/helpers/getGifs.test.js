import { getGifs } from "../../helpers";

describe('Pruebas en el helper getGifs', () => {
    test('Debe traer 10 elementos', async () => {
        const data = await getGifs('react')
        expect(data.length).toBe(10)
    });

    test('Debe traer 0 resultados en caso de tener parámetro vacío', async () => {
        const data = await getGifs('')
        expect(data.length).toBe(0)
    })
});
