import { renderHook, act } from '@testing-library/react-hooks'
import { useCounter } from '../../hooks'


describe('Pruebas al customHook useCounter', () => {
    /* The useCounter() hook returns an object with three properties:
    
    state: The current state of the counter.
    increment: A function that increments the state by one.
    decrement: A function that decrements the state by one.
    reset: A function that resets the state to the initial value. */
    test('Debe de retornar valores por defecto', () => {
        const { result } = renderHook(() => useCounter())

        expect(result.current.state).toBe(10)
        expect(typeof result.current.increment).toBe('function')
        expect(typeof result.current.decrement).toBe('function')
        expect(typeof result.current.reset).toBe('function')
    })


    test('Debe de tener el counter en 100', () => {
        const { result } = renderHook(() => useCounter(100))

        expect(result.current.state).toBe(100)
    })


    test('Debe de incrementar el counter en 1', () => {
        const { result } = renderHook(() => useCounter())

        const { increment } = result.current
        act(() => increment() )

        const { state } = result.current
        expect(state).toBe(11)
    })


    test('Debe de hacer reset al counter', () => {
        const { result } = renderHook(() => useCounter())

        const { reset } = result.current
        act(() =>  reset() )

        const { state } = result.current
        expect(state).toBe(10)
    })


    test('Debe de decrementar el counter en 10 y dar como resultado 90', () => {
        const { result } = renderHook(() => useCounter(100))

        const { decrement } = result.current
        act(() =>  decrement(10) )

        const { state } = result.current
        expect(state).toBe(90)
    })
})
