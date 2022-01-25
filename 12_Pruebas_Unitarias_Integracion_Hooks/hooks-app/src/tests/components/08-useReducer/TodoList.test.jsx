import React from 'react';
import { shallow } from 'enzyme'
import { TodoList } from '../../../components/08-useReducer';
import { demoTodos } from '../../fixtures/demoTodos';


describe('Pruebas al componente <TodoList />', () => {
    let wrapper

    const handleToggle = jest.fn()
    const handleDelete = jest.fn()

    beforeEach(() => {
        wrapper = shallow(<TodoList todos={demoTodos} handleToggle={handleToggle} handleDelete={handleDelete} />)
    })

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('Debe de tener n <TodoListItem />', () => {
        expect(wrapper.find('TodoListItem').length).toBe(demoTodos.length)
        expect(wrapper.find('TodoListItem').at(0).prop('handleDelete')).toEqual(expect.any(Function))
    })
})
