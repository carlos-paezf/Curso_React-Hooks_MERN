import React, { useMemo, useState } from 'react';
import { procesoPesado } from '../../helpers';
import { useCounter } from '../../hooks';

export const MemoHook = () => {

    const { state: counter, increment } = useCounter(5000)
    const [show, setShow] = useState(true);

    const memoProcesoPesado = useMemo(() => procesoPesado(counter), [counter]);

    return (
        <>
            <h2>Counter useMemorize {counter}</h2>
            <hr />
            <p>{memoProcesoPesado}</p>
            <button className="btn btn-primary" onClick={() => increment(1)}>+1</button>
            <button className="btn btn-outline-primary mx-3" onClick={() => setShow(!show)}>Show/Hide {JSON.stringify(show)}</button>
        </>
    )
};
