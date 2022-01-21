import React from 'react';
import PropTypes from 'prop-types'


export const Hijo = React.memo(({ numero, incrementar }) => {
    console.log('Generando Hijo')
    return <button className="btn btn-primary mx-3" onClick={() => incrementar(numero)}>{numero}</button>;
});


Hijo.propTypes = {
    numero: PropTypes.number.isRequired,
    incrementar: PropTypes.func.isRequired
}