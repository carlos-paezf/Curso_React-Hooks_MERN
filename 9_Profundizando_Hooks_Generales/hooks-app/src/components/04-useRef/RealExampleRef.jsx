import React, { useState } from 'react';
import { MultipleCustomHooks } from '../03-examples';

export const RealExampleRef = () => {

    const [show, setShow] = useState(false);

    return (
        <>
            <h2>Real Example Ref</h2>
            <hr />
            {show && <MultipleCustomHooks />}

            <button className="btn btn-primary" onClick={() => setShow(!show)}>
                Show/Hide
            </button>
        </>
    );
};
