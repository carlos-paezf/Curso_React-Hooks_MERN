import React from 'react';
import { mount } from 'enzyme'
import { LoginScreen } from '../../../components/09-useContext';
import { UserContext } from '../../../components/09-useContext/UserContext';


describe('Pruebas al componente <LoginScreen />', () => {
    let wrapper

    const setUser = jest.fn()

    beforeEach(() => {
        wrapper = mount(<UserContext.Provider value={{ setUser }}>
            <LoginScreen />
        </UserContext.Provider>)
    })

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('Debe hacer login con los argumentos especificos', () => {
        wrapper.find('button').simulate('click');

        expect(setUser).toHaveBeenCalledTimes(1)
        expect(setUser).toHaveBeenCalledWith({
            id: 1234,
            name: 'ferrer',
            email: 'test@mail.com'
        })
    })
})