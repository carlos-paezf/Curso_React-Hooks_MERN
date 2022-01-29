import { mount } from 'enzyme'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { HeroScreen } from '../../../components/hero'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}))


describe('Test to <HeroScreen /> component', () => {
    test('Should not display the component without a hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path='/hero' element={<HeroScreen />} />
                    <Route path='/' element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        )

        expect(wrapper.find('h1').text().trim()).toBe('No Hero Page')
    })

    test('Should display the component if there is a parameter and the hero exists', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/dc-batman']}>
                <Routes>
                    <Route path='/hero/:idHero' element={<HeroScreen />} />
                    <Route path='/' element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        )

        expect(wrapper.find('.row').exists()).toBe(true)
        expect(wrapper.find('h3').text().trim()).toBe('Batman')
    })

    test('Should return to the previous page', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/dc-batman']}>
                <Routes>
                    <Route path='/hero/:idHero' element={<HeroScreen />} />
                </Routes>
            </MemoryRouter>
        )

        wrapper.find('button').prop('onClick')()
        expect(mockNavigate).toHaveBeenCalledWith(-1)
    })


    test('Should display the No Hero Page if not there a hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/one-punch']}>
                <Routes>
                    <Route path='/hero/:idHero' element={<HeroScreen />} />
                    <Route path='/' element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        )

        expect(wrapper.find('h1').text().trim()).toBe('No Hero Page')
    })
})