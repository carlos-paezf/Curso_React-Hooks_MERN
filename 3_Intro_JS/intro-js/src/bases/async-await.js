const api_key = `UMxyzmG7A4NAsIH4vzodoaeu88tZRouC`
const baseURL = `https://api.giphy.com/v1/gifs/random?api_key=${api_key}`


const getImage = async () => {
    try {
        const peticion = await fetch(baseURL)
        const { data } = await peticion.json()
        const { url } = data.images.original
        const img = document.createElement('img')
        img.src = url
        document.body.append(img)
    } catch (error) {
        console.warn(error)
    }
}

getImage()