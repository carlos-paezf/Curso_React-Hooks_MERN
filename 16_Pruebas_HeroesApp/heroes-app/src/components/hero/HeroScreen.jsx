import React, { useMemo } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { getHeroByID } from '../../selectors';


export const HeroScreen = () => {

    const { idHero } = useParams()

    const navigate = useNavigate()

    const hero = useMemo(() => getHeroByID(idHero), [idHero]);

    if (!hero) return <Navigate to='/' />

    const { id, alter_ego, characters, first_appearance, publisher, superhero } = hero

    const handleReturn = () => {
        navigate(-1)
    };
    

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img src={`/assets/${id}.jpg`} alt={superhero} className="img-thumbnail animate__animated animate__bounceInLeft" />
            </div>
            <div className="col-8">
                <h3>{ superhero }</h3>
                <ul className="list-group my-3">
                    <li className="list-group-item"><b>Alter ego:</b> {alter_ego}</li>
                    <li className="list-group-item"><b>Publisher:</b> {publisher}</li>
                    <li className="list-group-item"><b>First Appearance:</b> {first_appearance}</li>
                </ul>
                <h5 className='my-3'>Characters</h5>
                <p>{characters}</p>

                <button className="btn btn-outline-info" onClick={handleReturn}>
                    Regresar
                </button>
            </div>
        </div>
    )
}
