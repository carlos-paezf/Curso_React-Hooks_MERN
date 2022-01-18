import '@testing-library/jest-dom'
import { getUser, getUsuarioActivo } from "../../base/05-funciones"


describe('Pruebas en 05-funciones.js', () => {
    test('getUser debe retornar un objeto', () => {
        const userTest = {
            uid: 'abc1234',
            username: 'asdfg1928'
        }

        const user = getUser();

        expect(user).toEqual(userTest)
    })
    

    test('getUsuarioActivo debe retornar un objeto con el mismo argumento', () => {
        const username = 'Ferrer'

        expect(getUsuarioActivo(username)).toEqual({
            uid: 'ABC567',
            username
        })
    })
    
})
