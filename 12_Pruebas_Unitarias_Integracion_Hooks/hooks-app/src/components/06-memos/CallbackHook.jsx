import React, { useCallback, useState } from 'react';
import { ShowIncrement } from '.';

export const CallbackHook = () => {

    const [counter, setCounter] = useState(10)

    const increment = useCallback((n) => setCounter(prev => prev + n), [setCounter])

    return (
        <>
            <h2>useCallback Hook: {counter}</h2>
            <hr />

            <ShowIncrement increment={increment} />
        </>
    )
}
