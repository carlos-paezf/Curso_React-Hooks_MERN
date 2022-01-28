import React from 'react';
import { HeroList } from '../hero';


export const MarvelScreen = () => {
    return (
        <>
            <h1>Marvel Screen</h1>

            <HeroList publisher={'Marvel Comics'} />
        </>
    )
}
