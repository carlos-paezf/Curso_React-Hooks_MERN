import React from 'react';
import { shallow } from 'enzyme'
import { TodoListItem } from '../../../components/08-useReducer';
import { demoTodos } from '../../fixtures/demoTodos';


/* The TodoListItem component is a stateless component that renders a single todo item.

The component has two props:

i: The index of the todo item.
todo: The todo object.

The component has two methods:

handleToggle: This method is called when the user clicks the checkbox.
handleDelete: This method is called when the user clicks the delete button. */
describe('Probar el componente <TodoListItem />', () => {
    let wrapper

    const handleToggle = jest.fn()
    const handleDelete = jest.fn()
    const i = 1

    beforeEach(() => {
        wrapper = shallow(
            <TodoListItem i={i} todo={demoTodos[1]} handleToggle={handleToggle} handleDelete={handleDelete} />
        )
    })

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('Debe de llamar la función borrar', () => {
        wrapper.find('button').simulate('click')
        expect(handleDelete).toHaveBeenCalled()
        expect(handleDelete).toHaveBeenCalledTimes(1)
        expect(handleDelete).toHaveBeenCalledWith(expect.any(Number))
        expect(handleDelete).toHaveBeenCalledWith(demoTodos[1].id)
    })

    test('Debe de mostrar el texto correctamente', () => {
        expect(wrapper.find('p').text().trim()).toBe(`${i + 1}. ${demoTodos[1].desc}`)
    })

    test('Debe de tener la clase complete si el TODO.done == true', () => {
        const todo = demoTodos[0]
        todo.done = true
        wrapper = shallow(
            <TodoListItem i={1} todo={todo} handleToggle={handleToggle} handleDelete={handleDelete} />
        )

        expect(wrapper.find('p').hasClass('complete')).toBe(true)
    })
})
