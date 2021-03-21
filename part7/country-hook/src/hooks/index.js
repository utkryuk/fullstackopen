import { useState, useEffect } from 'react'

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    useEffect(() => {
        const getdata = async () => {
            await fetch(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
            .then(response => response.json())
            .then(response => setCountry(response[0]))
        }
        getdata()
    }, [name])

    return country
}

export const useField = (type) => {
    
    const [value, setValue] = useState('')
    
    const onChange = (event) => {
        event.preventDefault()
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}