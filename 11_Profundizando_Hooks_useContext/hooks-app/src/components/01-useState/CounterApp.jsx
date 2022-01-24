import React, { useState } from 'react';
import './counter.css'

export const CounterApp = () => {
    const [state, setState] = useState({
        counter1: 10,
        counter2: 20,
        counter3: 30,
        counter4: 40,
        counter5: 50,
    });

    const { counter1, counter2 } = state

    const handleAdd = () => {
        setState({
            ...state,
            counter1: counter1 + 1
        })
    };


    return (
        <>
            <h2>Counter1: {counter1}</h2>
            <h2>Counter2: {counter2}</h2>
            <button
                className="btn btn-primary"
                onClick={handleAdd}>
                + 1 Counter1
            </button>
            <hr />
        </>
    )
};
