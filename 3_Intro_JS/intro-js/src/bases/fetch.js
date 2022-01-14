const api_key = `UMxyzmG7A4NAsIH4vzodoaeu88tZRouC`

const baseURL = `https://api.giphy.com/v1/gifs/random?api_key=${api_key}`

const petición = fetch(baseURL)

petición
    .then(res => res.json())
    .then(({ data }) => {
        const { url } = data.images.original
        const img = document.createElement('img')
        img.src = url
        document.body.append(img)
    })
    .catch(console.warn)