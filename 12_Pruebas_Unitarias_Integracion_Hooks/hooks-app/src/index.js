import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import { HookApp } from './HookApp';
// import UseReducerApp from './UseReducerApp';
import { MainApp } from './components/09-useContext';


ReactDOM.render(
    <React.StrictMode>
        {/* <HookApp /> */}
        {/* <UseReducerApp /> */}
        <MainApp />
    </React.StrictMode>,
    document.getElementById('root')
);
