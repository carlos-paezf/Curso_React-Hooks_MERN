import React from 'react';
import PropTypes from 'prop-types'


export const ShowIncrement = React.memo(({ increment }) => {
    console.log('Generando ShowIncrement')

    return <button className="btn btn-primary" onClick={() => increment(5)}>+5</button>
});


ShowIncrement.propTypes = {
    increment: PropTypes.func.isRequired
}