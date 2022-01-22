import React from 'react';
import { useCounter, useFetch } from '../../hooks';


export const MultipleCustomHooks = () => {

    const { state, increment } = useCounter(1)

    const { data, loading } = useFetch(`https://www.breakingbadapi.com/api/quotes/${state}`)


    const { author, quote } = !!data && data[0]

    return (
        <>
            <h2>Multiple CustomHooks - Breaking Bad Quotes</h2>
            <hr />
            {
                loading
                    ? <div className="alert alert-info text-center">...Loading...</div>
                    : <blockquote className="blockquote">
                        <p className="mb-2">{quote}</p>
                        <footer className="blockquote-footer">{author}</footer>
                    </blockquote>
            }
            <button className="btn btn-dark" onClick={() => increment(1)}>Siguiente Cita</button>
        </>
    );
};
