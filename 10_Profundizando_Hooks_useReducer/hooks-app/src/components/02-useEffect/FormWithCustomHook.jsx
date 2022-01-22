import React from 'react';
import { useForm } from '../../hooks';
import './useEffect.css'


export const FormWithCustomHook = () => {

    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = formValues

    const handleSubmit = (e) => {
        e.preventDefault()
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <h2>Form with Custom Hook</h2>

            <div className="form-group">
                <input type="text" name="name" value={name} onChange={handleInputChange} className="form-control" placeholder="Tu nombre" autoComplete="off" />
            </div>

            <div className="form-group">
                <input type="email" name="email" value={email} onChange={handleInputChange} className="form-control" placeholder="Tu email" autoComplete="off" />
            </div>

            <div className="form-group">
                <input type="password" name="password" value={password} onChange={handleInputChange} className="form-control" placeholder="Tu contraseña" autoComplete="off" />
            </div>

            <button className="btn btn-success">Enviar</button>
            <hr />
        </form>
    );
};
