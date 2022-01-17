import React from 'react'
import PropTypes from 'prop-types'


const PrimeraApp = ({ nombre, apellido }) => {
    const saludo = 'Hola mundo - const'
    const bool = true
    const persona = {
        nombre: 'David',
        apellido: 'Ferrer',
        edad: 21
    }

    return (
        <>
            <h1>Bienvenido { nombre } { apellido }</h1>
            <pre>{ saludo }</pre>
            <pre>{ JSON.stringify(bool) }</pre>
            <pre>{ JSON.stringify(persona) }</pre>
        </>
    )
}

PrimeraApp.propTypes = {
    nombre: PropTypes.string.isRequired
}

PrimeraApp.defaultProps = {
    apellido: 'nn'
}

export default PrimeraApp
