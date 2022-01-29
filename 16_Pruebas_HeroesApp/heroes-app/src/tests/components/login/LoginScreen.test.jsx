import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../../auth'
import { LoginScreen } from '../../../components/login'
import { types } from '../../../types'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))


describe('Test to <LoginScreen /> component', () => {
    const dispatch = jest.fn()

    const contextValue = {
        user: { logged: false },
        dispatch
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialState={['/login']}>
                <LoginScreen />
            </MemoryRouter>
        </AuthContext.Provider>
    )

    test('Should match with Snapshot', () => {
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('h1').text().trim()).toBe('Login Screen')
    })

    test('Should call login, dispatch, localStorage, navigate', () => {
        const handleClick = wrapper.find('button').prop('onClick')
        handleClick()

        const action = {
            type: types.login,
            payload: {
                name: 'David Ferrer'
            }
        }
        expect(dispatch).toHaveBeenCalledWith(action)
        expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true })
        
        localStorage.setItem('lastPath', '/search?q=Batman')
        handleClick()
        expect(mockNavigate).toHaveBeenCalledWith('/search?q=Batman', { replace: true })
    })
})