import React from 'react';
import PropTypes from 'prop-types'


export const TodoListItem = ({ i, todo, handleToggle, handleDelete }) => {
    const { id, desc, done } = todo

    return (
        <>
            <li key={i} className="list-group-item">
                <p onClick={() => handleToggle(id)} className={done ? "complete" : "text-center"}>{i + 1}. {desc}</p>
                <button onClick={() => handleDelete(id)} className="btn btn-danger">Eliminar</button>
            </li>
        </>
    );
};


TodoListItem.propTypes = {
    i: PropTypes.number.isRequired,
    todo: PropTypes.object.isRequired,
    handleToggle: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}