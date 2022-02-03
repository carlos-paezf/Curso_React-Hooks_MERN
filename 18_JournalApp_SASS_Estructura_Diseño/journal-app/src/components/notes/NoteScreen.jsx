import React from 'react';
import { NotesAppBar } from '.';

export const NoteScreen = () => {
    return (
        <div className='notes__main-content'>
            <NotesAppBar />
            <div className="notes__content">
                <input type="text" placeholder='Some awesome title' className='notes__title-input' autoComplete='off' />
                <textarea placeholder="What happened today?" className='notes__textarea'></textarea>

                <div className="notes__image">
                    <img src="https://images.unsplash.com/photo-1643669528728-191536f9bfba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1277&q=80" alt="img" />
                </div>
            </div>
        </div>
    )
}
