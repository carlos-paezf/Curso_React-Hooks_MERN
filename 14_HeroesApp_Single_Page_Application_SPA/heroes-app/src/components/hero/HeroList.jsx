import React, { useMemo } from 'react';
import { getHeroByPusblisher } from '../../selectors';
import PropTypes from 'prop-types'
import { HeroCard } from '.';


export const HeroList = ({ publisher }) => {

    const heroes = useMemo(() => getHeroByPusblisher(publisher), [publisher])

    return (
        <div className='row row-cols-1 row-cols-md-3 g-3 animate__animated animate__fadeIn'>
            {
                heroes.map(hero => <HeroCard key={hero.id} {...hero} />)
            }
        </div>
    )
}


HeroList.propTypes = {
    publisher: PropTypes.string.isRequired
}