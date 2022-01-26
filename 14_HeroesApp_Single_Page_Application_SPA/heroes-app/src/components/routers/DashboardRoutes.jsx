import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../ui';
import { DCScreen } from '../dc';
import { MarvelScreen } from '../marvel';
import { SearchScreen } from '../search';
import { HeroScreen } from '../hero';


export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />

            <div className="container mt-3">
                <Routes>
                    <Route path='marvel' element={<MarvelScreen />} />
                    <Route path='dc' element={<DCScreen />} />
                    <Route path='search' element={<SearchScreen />} />
                    <Route path='hero/:idHero' element={<HeroScreen />} />
                    <Route path='/' element={<MarvelScreen />} />
                </Routes>
            </div>
        </>
    )
}
