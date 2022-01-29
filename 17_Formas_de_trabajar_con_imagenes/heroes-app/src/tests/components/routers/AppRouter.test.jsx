import { mount } from 'enzyme'
import { AuthContext } from '../../../auth'
import { AppRouter } from '../../../components/routers'


describe('Test to <AppRouter /> component', () => {

    test('Should show login path if user is not authenticated', () => {
        const contextValue = {
            user: {
                logged: false
            }
        }
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        )
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('h1').text().trim()).toBe('Login Screen')
    })

    test('Should <Marvel /> component if user is authenticated', () => {
        const contextValue = {
            user: {
                name: 'Test',
                logged: true
            }
        }
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        )
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.navbar').exists()).toBeTruthy()
    })
})