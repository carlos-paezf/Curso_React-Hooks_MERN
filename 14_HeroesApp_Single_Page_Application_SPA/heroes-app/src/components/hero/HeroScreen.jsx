import React from 'react';
import { useParams, Navigate } from 'react-router-dom'
import { getHeroByID } from '../../selectors';


export const HeroScreen = () => {

    const { idHero } = useParams()

    const hero = getHeroByID(idHero)

    if(!hero) return <Navigate to='/' />

    return (
        <>
            <pre>{JSON.stringify(hero, null, 5)}</pre>
        </>
    )
}
