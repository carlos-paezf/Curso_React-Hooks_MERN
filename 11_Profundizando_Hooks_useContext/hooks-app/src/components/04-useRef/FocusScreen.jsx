import React, { useRef } from 'react';

export const FocusScreen = () => {

    const inputRef = useRef();

    const handleClick = () => {
        inputRef.current.focus()
        // document.querySelector('#input-focus').select()
    };
    

    return (
        <>
            <h2>Focus Screen</h2>
            <hr />
            <input ref={inputRef} id="input-focus" type="text" className="form-control" placeholder="Su nombre" />
            <button onClick={handleClick} className="btn btn-outline-primary mt-3">Focus</button>
        </>
    );
};
