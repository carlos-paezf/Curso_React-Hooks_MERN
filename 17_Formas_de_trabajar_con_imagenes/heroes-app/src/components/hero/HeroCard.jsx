import React from 'react'
import { Link } from 'react-router-dom'
import { heroImages } from '../../helpers'


export const HeroCard = ({
    id, superhero, publisher, alter_ego, first_appearance, characters
}) => {
    return (
        <div className='col animate__animated  animate__zoomIn animate__faster'>
            <div className="card">
                <div className="row nog-gutters">
                    <div className="col-md-5">
                        <img src={heroImages(`./${id}.jpg`)} className="card-img-top" alt={superhero} />
                    </div>
                    <div className="col-md-7">
                        <div className="card-body">
                            <h5 className="card-title">{ superhero }</h5>
                            <p className="card-text">{ alter_ego }</p>
                            {
                                alter_ego !== characters && <p className="text-mutted">{ characters }</p>
                            }
                            <p className="card-text">
                                <small className="text-muted">{ first_appearance }</small>
                            </p>
                            <Link to={`/hero/${id}`}>More...</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

