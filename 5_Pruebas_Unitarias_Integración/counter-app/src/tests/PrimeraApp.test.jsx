import React from 'react'
import { render, screen } from '@testing-library/react'

import { shallow } from 'enzyme'
import PrimeraApp from '../PrimeraApp'


describe('Pruebas en <PrimeraApp />', () => {
    test('Debe mostrar el mensaje "Bienvenido David nn"', () => {
        const saludo = 'Bienvenido David nn'
        render(<PrimeraApp nombre="David" />)
        expect(screen.getByText(saludo)).toBeInTheDocument()
    })

    test('Debe mostrar <PrimeraApp /> correctamente', () => {
        const wrapper = shallow(<PrimeraApp nombre='David' />)
        expect(wrapper).toMatchSnapshot()
    })
    
    test('Debe mostrar el apellido enviado por props', () => {
        const wrapper = shallow(<PrimeraApp nombre='David' apellido='Ferrer' />)
        const textH1 = wrapper.find('h1').text()
        expect(textH1).toBe(`Bienvenido David Ferrer`)
    })
})
