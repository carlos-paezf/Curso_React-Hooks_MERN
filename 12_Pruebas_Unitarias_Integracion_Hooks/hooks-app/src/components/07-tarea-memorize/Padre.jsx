import React, { useCallback, useState } from 'react';
import { Hijo } from '.';

export const Padre = () => {
    const numeros = [2, 4, 6, 8, 10]
    const [valor, setValor] = useState(0)

    const incrementar = useCallback((n) => setValor(prev => prev + n), [setValor])

    // const incrementar = (n) => setValor(valor + n)

    return (
        <>
            <h2>Padre</h2>
            <p>Total: {valor}</p>
            <hr />
            {
                numeros.map(n => <Hijo key={n} numero={n} incrementar={incrementar} />)
            }
        </>
    );
};
