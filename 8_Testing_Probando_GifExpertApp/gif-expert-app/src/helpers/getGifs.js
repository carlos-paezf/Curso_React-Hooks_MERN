export const getGifs = async (category) => {
    const baseUrl = `https://api.giphy.com/v1/gifs/search?q=${encodeURI(category)}&limit=10&api_key=UMxyzmG7A4NAsIH4vzodoaeu88tZRouC`
    const res = await fetch(baseUrl)
    const { data } = await res.json()

    const gifs = data.map(({ id, title, images }) => {
        return {
            id,
            title,
            url: images?.downsized_medium.url
        }
    })
    return gifs
};