import React from 'react';
import { NothingSelected, Sidebar } from '.';
import { NoteScreen } from '../notes';

export const JournalScreen = () => {
    return (
        <div className="journal__main-content">
            <Sidebar />
            <main>
                {/* <NothingSelected /> */}
                <NoteScreen />
            </main>
        </div>
    )
}