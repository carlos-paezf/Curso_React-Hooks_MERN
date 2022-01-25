import React from 'react';
import { shallow } from 'enzyme'
import { RealExampleRef } from '../../../components/04-useRef';


describe('Pruebas al componente <RealExampleRef />', () => {

    let wrapper

    beforeEach(() => {
        wrapper = shallow(<RealExampleRef />)
    })

    /* The first test is a snapshot test. It checks that the component renders correctly. 
    The second test is a component test. It checks that the component renders a <MultipleCustomHooks /> component. */
    test('Debe mostrarse correctamenre', () => {
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('MultipleCustomHooks').exists()).toBe(false)
    })

    test('Debe de mostrar el componente <MultipleCustomHooks />', () => {
        wrapper.find('button').simulate('click')

        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('MultipleCustomHooks').exists()).toBe(true)
    })
})
