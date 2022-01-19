import React, { useState } from 'react'
import { AddCategory, GifGrid } from './components'


const GifExpertApp = () => {

    const [categories, setCategories] = useState([])

    return (
        <>
            <h2>GifExpertApp</h2>
            <AddCategory setCategories={setCategories} />
            <hr />

            <ol>
                {categories.map(category => <GifGrid key={category} category={category} />)}
            </ol>
        </>
    )
}

export default GifExpertApp
