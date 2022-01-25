import { todoReducer } from "../../../components/08-useReducer/todoReducer"
import { demoTodos } from "../../fixtures/demoTodos"


describe('Pruebas a la función todoReducer', () => {

    /* The todoReducer function takes two arguments: the current state of the todos (an array of todo
    objects) and the action to be performed (a JavaScript object with a type property). It returns a
    new array of todo objects.
    
    The code inside the if-block checks the type property of the action. If it's the type property
    is ADD_TODO, it creates a new todo object with the text property set to the action's text
    property and the completed property set to false, and pushes it onto the todo array. */
    test('Debe de retornar el estado por defecto', () => {
        const state = todoReducer(demoTodos, {})

        expect(state).toEqual(demoTodos)
    })


    test('Debe de agregar un TODO', () => {
        const payload = {
            id: 3,
            desc: 'Nuevo TODO',
            done: true
        }

        const state = todoReducer(demoTodos, { type: 'add', payload })

        expect(state).toEqual([...demoTodos, payload])
        expect(state.length).toBe(3)
    })


    test('Debe de eliminar un TODO por su id (agregado en el anterior test)', () => {
        const state = todoReducer(demoTodos, { type: 'delete', payload: 3 })
        expect(state.length).toBe(2)
        expect(state).toEqual(demoTodos)
    })


    test('Debe de hacer el Toggle del TODO', () => {
        const state = todoReducer(demoTodos, { type: 'toggle', payload: 1 })
        expect(state[0].done).toBe(true)
        expect(state[1]).toEqual(demoTodos[1])
    })
})
