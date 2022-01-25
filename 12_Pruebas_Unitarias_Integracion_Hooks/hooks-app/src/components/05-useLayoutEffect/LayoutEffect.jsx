import React, { useLayoutEffect, useRef, useState } from 'react';
import { useCounter, useFetch } from '../../hooks';


export const LayoutEffect = () => {

    const { state, increment } = useCounter(1)
    const { data } = useFetch(`https://www.breakingbadapi.com/api/quotes/${state}`)
    const { quote } = !!data && data[0]

    const [boxSize, setBoxSize] = useState({});

    const pQuote = useRef();

    useLayoutEffect(() => {
        setBoxSize(pQuote.current.getBoundingClientRect())
    }, [quote]);
    

    return (
        <>
            <h2>useLayoutEffect - Breaking Bad Quotes</h2>
            <hr />
            <blockquote className="blockquote d-flex" style={{ "flexDirection" : 'column' }}>
                <p className="mb-2" ref={pQuote}>{quote}</p>
                <pre>{JSON.stringify(boxSize, null, 3)}</pre>
            </blockquote>

            <button className="btn btn-dark" onClick={() => increment(1)}>Siguiente Cita</button>
        </>
    );
};
