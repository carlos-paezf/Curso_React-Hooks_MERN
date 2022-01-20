import { shallow } from 'enzyme'
import { GifGridItem } from '../../components';


describe('Pruebas en <GifGridItem />', () => {
    const title = 'Gif para los test'
    const url = 'http://localhost:1234/img.gif'

    const wrapper = shallow(<GifGridItem title={title} url={url} />)

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('Debe de tener un párrafo con el título', () => {
        const p = wrapper.find('p')
        expect(p.text().trim()).toBe(title)
    });

    test('Debe de tener una imagen igual al url y alt de los props', () => {
        const img = wrapper.find('img')
        expect(img.props().src).toBe(url)
        expect(img.props().alt).toBe(title)
    });

    test('Debe de tener la clase animate__fadeIn', () => {
        const div = wrapper.find('div')
        expect(div.props().className.includes('animate__fadeIn')).toBe(true)
    })
})
