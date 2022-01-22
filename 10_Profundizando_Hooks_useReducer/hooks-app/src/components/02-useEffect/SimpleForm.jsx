import React, { useEffect, useState } from 'react';
import { Message } from '.';
import './useEffect.css'


export const SimpleForm = () => {

    const [formState, setFormState] = useState({
        name: '',
        email: ''
    });

    const { name, email } = formState

    useEffect(() => {  }, []);
    useEffect(() => {  }, [formState]);
    useEffect(() => {  }, [email]);

    const handleInputChange = ({ target }) => {
        setFormState({
            ...formState,
            [target.name]: target.value
        })
    };


    return (
        <>
            <h2>useEffect</h2>

            <div className="form-group">
                <input type="text" name="name" value={name} onChange={handleInputChange} className="form-control" placeholder="Tu nombre" autoComplete="off" />
            </div>

            <div className="form-group">
                <input type="email" name="email" value={email} onChange={handleInputChange} className="form-control" placeholder="Tu email" autoComplete="off" />
            </div>

            {(name === 'Ferrer') && <Message />}
            <hr />
        </>
    )
}
