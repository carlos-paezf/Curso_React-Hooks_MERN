import React from 'react';
import { shallow, mount } from 'enzyme'
import { TodoApp } from '../../../components/08-useReducer';
import { demoTodos } from '../../fixtures/demoTodos';
import { act } from '@testing-library/react'


describe('Pruebas al componente <TodoApp />', () => {
    let wrapper

    Storage.prototype.setItem = jest.fn(() => {})

    beforeEach(() => {
        wrapper = shallow(<TodoApp />)
    })

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('Debe de agregar un TODO', () => {
        const wrapper = mount(<TodoApp />)
        act(() => {
            wrapper.find('TodoAdd').prop('handleAddTodo')( demoTodos[0] )
            wrapper.find('TodoAdd').prop('handleAddTodo')( demoTodos[1] )
        })
        expect(wrapper.find('#todo-app-title').text().trim()).toBe('TodoApp ( 2 )')
        expect(localStorage.setItem).toHaveBeenCalledTimes(2)
    })

    test('Debe de eliminar un TODO', () => {
        wrapper.find('TodoAdd').prop('handleAddTodo')( demoTodos[0] )
        wrapper.find('TodoList').prop('handleDelete')( demoTodos[0].id )
        expect(wrapper.find('#todo-app-title').text().trim()).toBe('TodoApp ( 0 )')
    })
})
