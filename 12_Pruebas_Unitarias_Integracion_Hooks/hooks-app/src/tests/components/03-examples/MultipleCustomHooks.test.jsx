import React from 'react';
import { shallow } from 'enzyme'
import { MultipleCustomHooks } from "../../../components/03-examples/"
import { useFetch, useCounter } from '../../../hooks';

jest.mock('../../../hooks/useFetch')
jest.mock('../../../hooks/useCounter')


describe('Pruebas al componente <Multiple Custom Hook />', () => {

    beforeEach(() => {
        useCounter.mockReturnValue({
            state: 10,
            increment: jest.fn(),
            decrement: jest.fn(),
            reset: jest.fn()
        })
    })
    
    /* The useFetch hook is used to fetch data from an API. The useFetch hook returns an object with
    the following properties:
    
    data: The data returned by the API.
    loading: A boolean indicating whether the data is being fetched.
    error: The error returned by the API. */
    test('Debe de mostrarse correctamente', () => {
        useFetch.mockReturnValue({
            data: null,
            loading: true,
            error: null
        })

        const wrapper = shallow(<MultipleCustomHooks />)

        expect(wrapper).toMatchSnapshot()
    })


    test('Debe de mostrar la información', () => {
        useFetch.mockReturnValue({
            data: [{
                author: 'Ferrer',
                quote: 'Hola mundo'
            }],
            loading: false,
            error: null
        })

        const wrapper = shallow(<MultipleCustomHooks />)

        expect(wrapper.find('.alert').exists()).toBe(false)
        expect(wrapper.find('.mb-2').text().trim()).toBe('Hola mundo')
        expect(wrapper.find('footer').text().trim()).toBe('Ferrer')
    })
})
