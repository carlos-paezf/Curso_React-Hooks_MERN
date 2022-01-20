import React from 'react';
import { shallow } from 'enzyme'
import { AddCategory } from '../../components'


describe('Pruebas en el componente <AddCategory />', () => {
    const setCategories = jest.fn()

    let wrapper = shallow(<AddCategory setCategories={setCategories} />)

    beforeEach(() => {
        jest.clearAllMocks()
        wrapper = shallow(<AddCategory setCategories={setCategories} />)
    })


    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('Debe de cambiar la caja de texto', () => {
        const input = wrapper.find('input')
        const value = 'Hola mundo'
        input.simulate('change', { target: { value } })

        expect(wrapper.find('p').text().trim()).toBe(value)
    })

    test('NO debe de postear la información con submit', () => {
        const form = wrapper.find('form')
        form.simulate('submit', { preventDefault() { } })
        expect(setCategories).not.toHaveBeenCalled()
    })
});
