import React, { useReducer } from 'react';
import { todoReducer } from './todoReducer';


const initialState = [{
    id: new Date().getTime(),
    desc: 'Aprender React',
    done: false
}]


export const TodoApp = () => {

    const [todos] = useReducer(todoReducer, initialState)

    return (
        <>
            <h2>TodoApp ( {todos.length} )</h2>
            <hr />

            <div className="row">
                <div className="col-sm-12 col-md-8">
                    <ul className="list-group list-group-flush">
                        {todos.map(({ id, desc }, i) =>  (
                            <li key={i} className="list-group-item">
                                <p className="text-center">{i + 1}. {desc}</p>
                                <button className="btn btn-danger">Eliminar</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-sm-12 col-md-4">
                    <h2>Agregar TODO</h2>
                    <hr />

                    <form className="form-group">
                        <input className="form-control" type="text" name="desc" placeholder="Aprender ..." />
                        <button className="btn btn-outline-primary w-100 mt-3">Agregar</button>
                    </form>
                </div>
            </div>

        </>
    );
};

