import React from 'react';
import { CounterApp, CounterWithCustomHook } from './components/01-useState';
import { FormWithCustomHook, SimpleForm } from './components/02-useEffect';
import { MultipleCustomHooks } from './components/03-examples';
import { FocusScreen, RealExampleRef } from './components/04-useRef';
import { LayoutEffect } from './components/05-useLayoutEffect';
import { CallbackHook, MemoHook, Memorize } from './components/06-memos';
import { Padre } from './components/07-tarea-memorize';


export const HookApp = () => {
    return (
        <>
            <h1>Hooks App</h1>
            <hr />

            <table className='table'>
                <tbody>
                    <tr>
                        <th><CounterApp /></th>
                        <th><CounterWithCustomHook /></th>
                    </tr>

                    <tr>
                        <th><SimpleForm /></th>
                        <th><FormWithCustomHook /></th>
                    </tr>

                    <tr>
                        <th colSpan={2}><MultipleCustomHooks /></th>
                    </tr>

                    <tr>
                        <th><FocusScreen /></th>
                        <th><RealExampleRef /></th>
                    </tr>

                    <tr>
                        <th colSpan={2}><LayoutEffect /></th>
                    </tr>

                    <tr>
                        <th><Memorize /></th>
                        <th><MemoHook /></th>
                    </tr>

                    <tr>
                        <th colSpan={2}><CallbackHook /></th>
                    </tr>

                    <tr>
                        <th colSpan={2}><Padre /></th>
                    </tr>
                </tbody>
            </table>
        </>
    )
};
