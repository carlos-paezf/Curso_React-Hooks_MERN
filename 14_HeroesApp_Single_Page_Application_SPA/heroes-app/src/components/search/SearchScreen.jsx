import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string'
import { useForm } from '../../hooks';
import { getHeroByName } from '../../selectors';
import { HeroCard } from '../hero';


export const SearchScreen = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const { q = '' } = queryString.parse(location.search)

    const [formValues, handleInputChange] = useForm({
        searchText: q
    })

    const { searchText } = formValues

    const heroesFilter = useMemo(() => getHeroByName(q), [q])

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`?q=${searchText}`)
    }


    return (
        <>
            <h1>Search</h1>
            <hr />
            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-5">
                    <h4>Search</h4>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="searchText" value={searchText} onChange={handleInputChange} className='form-control' placeholder='Search a hero' autoComplete='off' />
                        <button type="submit" className='btn btn-outline-primary mt-3 w-100'>Search</button>
                    </form>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-7">
                    <h4>Results:</h4>
                    <hr />
                    {
                        (q === '')
                            ? <div className="alert alert-info">Search a Hero</div>
                            : (heroesFilter.length === 0) && <div className="alert alert-info">No Matches by { q }</div>
                    }
                    {
                        heroesFilter.map(hero => <HeroCard key={hero.id} {...hero} />)
                    }
                </div>
            </div>
        </>
    )
}
