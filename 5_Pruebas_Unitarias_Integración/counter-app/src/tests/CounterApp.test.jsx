import React from 'react'
import { shallow } from 'enzyme'
import CounterApp from '../CounterApp'


describe('Pruebas de <CounterApp />', () => {
    let wrapper = shallow(<CounterApp />)
    beforeEach(() => {
        wrapper = shallow(<CounterApp />)
    })

    test('Debe mostrar <CounterApp /> correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('Debe mostrar 100 en el valor inicial', () => {
        const wrapper = shallow(<CounterApp value={100} />)
        const textH2 = wrapper.find('h2').text()
        expect(textH2).toBe('100')
    })

    test('Debe incrementar el contador', () => {
        wrapper.find('button').at(0).simulate('click')
        const textH2 = wrapper.find('h2').text()
        expect(textH2).toBe('11')
    })

    test('Debe disminuir el contador', () => {
        wrapper.find('button').at(1).simulate('click')
        const textH2 = wrapper.find('h2').text()
        expect(textH2).toBe('9')
    })

    test('Debe hacer reset al valor por defecto', () => {
        const wrapper = shallow(<CounterApp value={100} />)
        for (let i = 0; i < 15; i++) {
            wrapper.find('button').at(0).simulate('click')
        }
        wrapper.find('button').at(2).simulate('click')
        const textH2 = wrapper.find('h2').text()
        expect(textH2).toBe('100')
    })
})
