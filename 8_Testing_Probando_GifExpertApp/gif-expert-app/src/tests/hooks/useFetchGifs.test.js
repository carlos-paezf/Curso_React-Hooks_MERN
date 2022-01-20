import '@testing-library/jest-dom'
import { renderHook } from '@testing-library/react-hooks'
import { useFetchGifs } from '../../hooks';


describe('Pruebas al hook useFetchGifs', () => {
    const category = 'test'

    test('Debe de retornar el estado inicial', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useFetchGifs(category))
        const { data, loading } = result.current

        await waitForNextUpdate()

        expect(data).toEqual([])
        expect(loading).toBe(true)
    })

    test('Debe retornar un arreglo de imágenes y el loading en false', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useFetchGifs(category))
        await waitForNextUpdate()
        const { data, loading } = result.current

        expect(data.length).toBe(10)
        expect(loading).toBe(false)
    })
});
