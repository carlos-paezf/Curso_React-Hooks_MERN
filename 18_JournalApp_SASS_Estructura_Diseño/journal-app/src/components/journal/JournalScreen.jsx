import React from 'react';
import { NothingSelected, Sidebar } from '.';

export const JournalScreen = () => {
    return (
        <div className="journal__main-content">
            <Sidebar />
            <main>
                <NothingSelected />
            </main>
        </div>
    )
}