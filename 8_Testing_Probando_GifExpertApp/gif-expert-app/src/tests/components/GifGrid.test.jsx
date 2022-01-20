import React from 'react';
import '@testing-library/jest-dom'
import { shallow } from 'enzyme'
import { GifGrid } from '../../components';
import { useFetchGifs } from '../../hooks';

jest.mock('../../hooks/useFetchGifs')


describe('Pruebas al componente <GifGrid />', () => {
    const category = 'test'
    
    test('Debe mostrarse correctamente', () => {
        useFetchGifs.mockReturnValue({
            data: [],
            loading: true
        }) 
        const wrapper = shallow(<GifGrid category={category} />)
        expect(wrapper).toMatchSnapshot()
    });

    test('Debe de mostrar items cuando se cargan imágenes useFetchGifs', () => {
        const gifs = [{
            id: 'ABX',
            url: 'url aquí',
            title: 'título del gif'
        }]
        
        useFetchGifs.mockReturnValue({
            data: gifs,
            loading: false
        })
        const wrapper = shallow(<GifGrid category={category} />)
        expect(wrapper).toMatchSnapshot()

        expect(wrapper.find('p').exists()).toBe(false)
        expect(wrapper.find('GifGridItem').length).toBe(gifs.length)
    })
});
