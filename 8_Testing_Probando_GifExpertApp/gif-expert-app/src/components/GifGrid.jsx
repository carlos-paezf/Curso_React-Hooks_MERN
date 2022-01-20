import React from 'react'
import PropTypes from 'prop-types'
import { GifGridItem } from '.';
import { useFetchGifs } from '../hooks';

export const GifGrid = ({ category }) => {

    const { data: gifs, loading } = useFetchGifs(category)

    return (
        <>
            <h3>{category}</h3>
            {loading && <p className="card animate__animated animate__flash">Cargando...</p>}
            <div className='card-grid'>
                {
                    gifs.map(gif => <GifGridItem key={gif.id} {...gif} />)
                }
            </div>
        </>
    )
}

GifGrid.propTypes = {
    category: PropTypes.string
}
