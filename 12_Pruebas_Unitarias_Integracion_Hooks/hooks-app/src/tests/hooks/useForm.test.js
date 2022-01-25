import { renderHook, act } from '@testing-library/react-hooks'
import { useForm } from '../../hooks'


describe('Purebas al customHook useForm', () => {
    const initialForm = {
        name: 'Ferrer',
        email: 'test@mail.com'
    }

    /* The useForm hook returns an array of three values:
    
    The first value is an object containing the form values.
    The second value is a function that takes an event object and updates the form values.
    The third value is a function that resets the form values to their initial state. */
    test('Debe regresar un formulario por defecto', () => {
        const { result } = renderHook(() => useForm(initialForm))

        const [values, handleInputChange, reset] = result.current

        expect(values).toEqual(initialForm)
        expect(typeof handleInputChange).toBe('function')
        expect(typeof reset).toBe('function')
    })

    test('Debe cambiar 1 campo del formulario (name)', () => {
        const { result } = renderHook(() => useForm(initialForm))
        const [, handleInputChange,] = result.current

        act(() => {
            handleInputChange({ target: { name: 'name', value: 'new' } })
        })

        const [values] = result.current
        expect(values).toEqual({ ...initialForm, name: 'new' })
    })

    test('Debe re-establecer el formulario con Reset', () => {
        const { result } = renderHook(() => useForm(initialForm))
        const [, handleInputChange, reset] = result.current

        act(() => {
            handleInputChange({ target: { name: 'name', value: 'new' } })
            reset()
        })

        const [values] = result.current
        expect(values).toBe(initialForm)
    })
})
