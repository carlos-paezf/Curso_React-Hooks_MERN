import { renderHook } from '@testing-library/react-hooks'
import { useFetch } from '../../hooks/useFetch'


describe('Pruebas al customHook useFetch', () => {
    /* The first line of the test function is a call to the renderHook function. 
    This function takes a function as a parameter and runs it in an isolated environment. 
    The function is passed to the renderHook function as a parameter and is executed in an isolated
    environment. 
    The renderHook function returns an object that contains the current state and functions to
    update the state. 
    The object is stored in the result variable.
    
    The second line of the test function is a call to the useFetch function. 
    This function takes a string */
    test('Debe traer la información por defecto', () => {
        const { result } = renderHook(() => useFetch('https://www.breakingbadapi.com/api/quotes/1'))

        const { data, loading, error } = result.current

        expect(data).toBe(null)
        expect(loading).toBe(true)
        expect(error).toBe(null)
    })

    test('Debe de tener la info deseada', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useFetch('https://www.breakingbadapi.com/api/quotes/1'))
        await waitForNextUpdate()

        const { data, loading, error } = result.current

        expect(data.length).toBe(1)
        expect(loading).toBe(false)
        expect(error).toBe(null)
    })

    test('Debe de manejar el error', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useFetch('https://reqres.in/apid/users?page=2'))
        await waitForNextUpdate({ timeout: 5000 })

        const { data, loading, error } = result.current

        expect(data).toBe(null)
        expect(loading).toBe(false)
        expect(error).toBe('No se pudo cargar la data')
        expect(error).not.toBe(null)
    })
})
