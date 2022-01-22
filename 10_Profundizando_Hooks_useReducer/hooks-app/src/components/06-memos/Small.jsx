import React from 'react';
import PropTypes from 'prop-types'

export const Small = React.memo(({ value }) => {
    console.log('Small se está llamando')

    return <small>{value}</small>;
})


Small.propTypes = {
    value: PropTypes.number.isRequired
}