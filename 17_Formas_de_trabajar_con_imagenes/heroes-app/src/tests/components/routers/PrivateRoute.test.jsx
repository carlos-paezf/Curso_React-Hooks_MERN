import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../../auth'
import { PrivateRoute } from '../../../components/routers'


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Exit</span>
}))

describe('Test to <PrivateRoute /> component', () => {
    Storage.prototype.setItem = jest.fn()

    test('Should display the component if the user is authenticated and save in the localStorage', () => {
        const contextValue = {
            user: {
                logged: true,
                name: 'Test'
            }
        }
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(wrapper.text().trim()).toBe('Private Component')
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/')
    })


    test('Should block the component if the user is not authenticated', () => {
        const contextValue = {
            user: {
                logged: false
            }
        }
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(wrapper.text().trim()).toBe('Exit')
    })
})