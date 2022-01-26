import React from 'react';
import { getHeroByPusblisher } from '../../selectors';
import PropTypes from 'prop-types'
import { HeroCard } from '.';


export const HeroList = ({ publisher }) => {

    const heroes = getHeroByPusblisher(publisher)

    return (
        <div className='row row-cols-1 row-cols-md-3 g-3'>
            {
                heroes.map(hero => <HeroCard key={hero.id} {...hero} />)
            }
        </div>
    )
}


HeroList.propTypes = {
    publisher: PropTypes.string.isRequired
}