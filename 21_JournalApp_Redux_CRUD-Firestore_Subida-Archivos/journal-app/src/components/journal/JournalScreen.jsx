import React from 'react';
import { useSelector } from 'react-redux';
import { NothingSelected, Sidebar } from '.';
import { NoteScreen } from '../notes';

export const JournalScreen = () => {

    const { active } = useSelector(state => state.notes)

    return (
        <div className="journal__main-content">
            <Sidebar />
            <main>
                { active ? <NoteScreen /> : <NothingSelected /> }                
            </main>
        </div>
    )
}