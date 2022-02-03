import React from 'react';

export const NotesAppBar = () => {
    return (
        <div className='notes__appbar'>
            <span>El día de hoy</span>
            <div>
                <button className="btn">Picture</button>
                <button className="btn">Save</button>
            </div>
        </div>
    )
}
