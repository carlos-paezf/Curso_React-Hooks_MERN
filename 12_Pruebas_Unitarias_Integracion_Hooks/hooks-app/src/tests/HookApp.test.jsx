import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import { HookApp } from '../HookApp';


describe('Pruebas al componente <HookApp />', () => {
    /* Creating a shallow wrapper for the HookApp component. */
    let wrapper = shallow(<HookApp />)

    /* This is a test setup. It is creating a shallow wrapper for the component. */
    beforeEach(() => {
        wrapper = shallow(<HookApp />)
    })

    /* Testing the component. */
    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })
})