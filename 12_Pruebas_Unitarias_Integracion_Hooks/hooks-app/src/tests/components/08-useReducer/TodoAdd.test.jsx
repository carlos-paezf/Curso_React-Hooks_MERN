import React from 'react';
import { shallow } from 'enzyme'
import { TodoAdd } from '../../../components/08-useReducer';


describe('Pruebas al componente <TodoAdd />', () => {
    let wrapper

    const handleAddTodo = jest.fn()

    beforeEach(() => {
        wrapper = shallow(<TodoAdd handleAddTodo={handleAddTodo} />)
    })

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('NO debe llamar handleAddTodo', () => {
        const formSubmit = wrapper.find('form').prop('onSubmit')

        formSubmit({ preventDefault() { } })

        expect(handleAddTodo).not.toHaveBeenCalled()
        expect(handleAddTodo).toHaveBeenCalledTimes(0)
    })

    test('Debe de llamar la función handleAddTodo', () => {
        const value = 'Aprender Testing'
        wrapper.find('input').simulate('change', { target: { value, name: 'desc' } })

        const formSubmit = wrapper.find('form').prop('onSubmit')
        formSubmit({ preventDefault() { } })

        expect(handleAddTodo).toHaveBeenCalled()
        expect(handleAddTodo).toHaveBeenCalledTimes(1)
        expect(handleAddTodo).toHaveBeenCalledWith(expect.any(Object))
        expect(handleAddTodo).toHaveBeenCalledWith({
            id: expect.any(Number),
            desc: value,
            done: false
        })
        expect(wrapper.find('input').prop('value')).toBe('')
    })
})
