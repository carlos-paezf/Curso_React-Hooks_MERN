import { useEffect, useRef, useState } from "react";

/**
 * @param url - the URL to fetch
 * @returns The state object.
 */
export const useFetch = (url) => {

    const isMounted = useRef(true);

    const [state, setState] = useState({
        data: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, []);


    useEffect(() => {
        setState({ data: null, loading: true, error: null })
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (isMounted.current) {
                    setState({
                        data,
                        loading: false,
                        error: null
                    })
                } else {
                    console.log('setState no se llamo')
                }
            })
            .catch(error => {
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la data'
                })
            })
    }, [url]);

    return state
}
