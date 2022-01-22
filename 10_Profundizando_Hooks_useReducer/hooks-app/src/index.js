import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import { HookApp } from './HookApp';
import UseReducerApp from './UseReducerApp';


ReactDOM.render(
    <React.StrictMode>
        {/* <HookApp /> */}
        <UseReducerApp />
    </React.StrictMode>,
    document.getElementById('root')
);
