import React from 'react';
import { mount } from 'enzyme'
import { HomeScreen } from '../../../components/09-useContext';
import { UserContext } from '../../../components/09-useContext/UserContext';


describe('Pruebas en <HomeScreen />', () => {
    let wrapper

    const user = {
        name: 'test',
        email: 'mail'
    }
    const setUser = jest.fn()

    beforeEach(() => {
        wrapper = mount(<UserContext.Provider value={{user, setUser}}>
            <HomeScreen />
        </UserContext.Provider>)
    })

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })
})
