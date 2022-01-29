import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../../auth'
import { Navbar } from '../../../components/ui'
import { types } from '../../../types'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))


describe('Test to <Navbar /> component', () => {
    const dispatch =jest.fn()

    const contextValue = {
        user: {
            logged: true,
            name: 'Test'
        },
        dispatch
    }

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/']}>
                <Navbar />
            </MemoryRouter>
        </AuthContext.Provider>
    )


    test('Should match with Snapshot', () => {
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.text-info').text().trim()).toBe('Test')
    })

    test('Should call: logout, navigate and dispatch with args', () => {
        wrapper.find('button').simulate('click', { preventDefault(){} })

        const action = { type: types.logout }

        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(action)
        expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true })
    })
})