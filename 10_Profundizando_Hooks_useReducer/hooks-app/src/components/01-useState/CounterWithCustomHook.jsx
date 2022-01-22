import React from 'react';
import { useCounter } from '../../hooks';
import './counter.css'


export const CounterWithCustomHook = () => {

    const { state: counter, increment, decrement, reset } = useCounter()

    return (
        <>
            <h2>Counter with Custom Hook: {counter}</h2>
            <button className="btn btn-dark" onClick={() => increment(2)}>+ 2</button>
            <button className="btn" onClick={reset}>Reset</button>
            <button className="btn btn-dark" onClick={() => decrement(2)}>- 2</button>
            <hr />
        </>
    )
};
