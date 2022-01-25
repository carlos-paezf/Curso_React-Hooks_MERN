import React from 'react';
import { mount } from 'enzyme'
import { AppRouter } from '../../../components/09-useContext';
import { UserContext } from '../../../components/09-useContext/UserContext';


/* The <AppRouter /> component is mounted in a <UserContext.Provider> component, which provides the
user object to the <AppRouter /> component. */
describe('Pruebas al componente <AppRouter />', () => {

    const user = {
        name: 'test',
        email: 'mail'
    }

    const wrapper = mount(<UserContext.Provider value={{ user }}>
        <AppRouter />
    </UserContext.Provider>)

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })
})