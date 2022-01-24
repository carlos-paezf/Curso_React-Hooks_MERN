import React, { useState } from 'react';
import { Small } from '.';
import { useCounter } from '../../hooks';

export const Memorize = () => {

    const { state: counter, increment } = useCounter(10)
    const [show, setShow] = useState(true);

    return (
        <>
            <h2>Counter <Small value={counter} /></h2>
            <hr />
            <button className="btn btn-primary" onClick={() => increment(1)}>+1</button>    
            <button className="btn btn-outline-primary mx-3" onClick={() => setShow(!show)}>Show/Hide {JSON.stringify(show)}</button>    
        </>
    )
};
