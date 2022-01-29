import React from 'react';
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../../auth'
import { DashboardRoutes } from '../../../components/routers'


describe('Test to <DashboardRoutes /> component', () => {
    const contextValue = {
        user: {
            logged: true,
            name: 'Test'
        }
    }

    /* We are using the AuthContext.Provider to provide the value of the context to the DashboardRoutes
    component.
    
    We are using the MemoryRouter to render the component in a test environment.
    
    We are using the expect(wrapper).toMatchSnapshot() to make sure that the component renders
    correctly.
    
    We are using the expect(wrapper.find('.text-info').text().trim()).toBe('Test') to make sure that
    the text of the component is Test. */
    test('Should match with Snapshot', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.text-info').text().trim()).toBe('Test')
    })

    test('Should match with Snapshot in Marvel path', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('h1').text().trim()).toBe('Marvel Screen')
    })

    test('Should match with Snapshot in DC path', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/dc']}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('h1').text().trim()).toBe('DC Screen')
    })
})