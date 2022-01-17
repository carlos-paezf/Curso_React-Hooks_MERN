import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

// import PrimeraApp from './PrimeraApp'
import CounterApp from './CounterApp'


const divRoot = document.querySelector('#root')


ReactDOM.render(
    <React.StrictMode>
        <CounterApp value={ 12345 } />
    </React.StrictMode>, 
    divRoot
)
