import React from 'react';
import PropTypes from 'prop-types'

export const GifGridItem = ({ id, title, url }) => {
    return (
        <div className="card animate__animated animate__fadeIn">
            <img src={url} alt={title} className="card animate__animated animate__fadeInDown" />
            <p>{title}</p>
        </div>
    );
};

GifGridItem.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    img: PropTypes.string
}
