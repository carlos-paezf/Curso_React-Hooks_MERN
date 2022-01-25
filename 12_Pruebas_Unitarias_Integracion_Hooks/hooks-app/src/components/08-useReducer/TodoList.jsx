import React from 'react';
import { TodoListItem } from '.';
import PropTypes from 'prop-types'


export const TodoList = ({ todos, handleToggle, handleDelete }) => {
    return (
        <>
            <ul className="list-group list-group-flush">
                {todos.map((todo, i) => <TodoListItem key={i} i={i} todo={todo} handleToggle={handleToggle} handleDelete={handleDelete} />)}
            </ul>
        </>
    );
};


TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    handleToggle: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}