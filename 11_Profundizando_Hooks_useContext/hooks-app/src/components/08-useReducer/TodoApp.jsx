import React, { useEffect, useReducer } from 'react';
import { TodoAdd, TodoList } from '.';
import { todoReducer } from './todoReducer';


const init = () => JSON.parse(localStorage.getItem('todos')) || []


export const TodoApp = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], init)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const handleDelete = (todoId) => { 
        dispatch({
            type: 'delete',
            payload: todoId
        })
    };

    const handleToggle = (todoId) => {
        dispatch({
            type: 'toggle',
            payload: todoId
        })
    };

    const handleAddTodo = (newTodo) => {
        dispatch({
            type: 'add',
            payload: newTodo
        })
    };
    


    return (
        <>
            <h2>TodoApp ( {todos.length} )</h2>
            <hr />

            <div className="row">
                <div className="col-sm-12 col-md-8">
                    <TodoList todos={todos} handleToggle={handleToggle} handleDelete={handleDelete} />
                </div>

                <div className="col-sm-12 col-md-4">
                    <TodoAdd handleAddTodo={handleAddTodo} />
                </div>
            </div>
        </>
    )
}
