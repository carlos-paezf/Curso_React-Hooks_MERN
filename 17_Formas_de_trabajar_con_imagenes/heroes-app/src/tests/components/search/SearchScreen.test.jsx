import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { SearchScreen } from '../../../components/search'
import { AuthContext } from '../../../auth'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))


describe('Test to <SearchScreen /> component', () => {
    const contextValue = {
        user: {
            logged: true,
            name: 'Test'
        }
    }


    /* The SearchScreen component is rendered inside a MemoryRouter component. 
    The SearchScreen component is rendered inside an AuthContext.Provider component. 
    The AuthContext.Provider component is passed the contextValue object. 
    The AuthContext.Provider component is used to provide the AuthContext.Consumer component with
    the contextValue object. */
    test('Should match with Snapshot', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search']}>
                    <SearchScreen />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a Hero')
    })

    test('Should show a Batman card and the input with the queryString value', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <SearchScreen />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('input').prop('value')).toBe('batman')
        expect(wrapper.find('img').prop('alt')).toBe('Batman')
    })

    test('Should show an error if it does not find a hero', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search?q=One%20Punch']}>
                    <SearchScreen />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('input').prop('value')).toBe('One Punch')
        expect(wrapper.find('.alert-info').text().trim()).toBe('No Matches by One Punch')
    })

    test('Should call `navigate` to the new screen', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/search']}>
                    <SearchScreen />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        wrapper.find('input').simulate('change', { target: { name: 'searchText', value: 'Spider' } })
        wrapper.find('form').prop('onSubmit')({ preventDefault: () => {} })
        expect(mockNavigate).toHaveBeenCalledWith('?q=Spider')
    })
})