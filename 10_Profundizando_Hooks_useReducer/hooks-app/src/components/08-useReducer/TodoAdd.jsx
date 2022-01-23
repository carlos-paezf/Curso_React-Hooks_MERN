import React from 'react';
import { useForm } from '../../hooks';
import PropTypes from 'prop-types'


export const TodoAdd = ({ handleAddTodo }) => {
    const [{ desc }, handleInputChange, reset] = useForm({
        desc: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (desc.trim().length < 1) return
        const newTodo = {
            id: new Date().getTime(),
            desc: desc,
            done: false
        }
        handleAddTodo(newTodo)
        reset()
    }

    return (
        <>
            <h2>Agregar TODO</h2>
            <hr />

            <form onSubmit={handleSubmit} className="form-group">
                <input type="text" name="desc" value={desc} onChange={handleInputChange} className="form-control" placeholder="Aprender ..." />
                <button className="btn btn-outline-primary w-100 mt-3" type="submit">Agregar</button>
            </form>
        </>
    );
}; 


TodoAdd.propTypes = {
    handleAddTodo: PropTypes.func.isRequired
}