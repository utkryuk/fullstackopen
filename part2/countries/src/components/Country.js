import React, {useState} from 'react'
import Weather from './Weather'
import axios from 'axios'

const Country = ({country}) => {

    const [weather, setWeather] = useState(() => {
        const initialState = axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
        .then(response => {
            setWeather(response.data.current)
            // console.log(response.data.current)    
        })
        return initialState
    })
        // console.log(response.data.current)
        // console.log(response.data.current.temperature)

    console.log("sfg", weather)

    return (
        <div>
            <h1>{country.name}</h1>
            capital {country.capital}<br />
            population {country.population}<br />
            
            <h3>languages</h3>
            <ul>
                {country.languages.map((language) => {
                    return <li key = {language.name}>{language.name}</li>
                })}
            </ul>
            <img src = {country.flag} alt = {`flag of ${country.name}`} width = "25%" height = "25%"></img>
            <Weather city = {country.capital}  current = {weather}/>
        </div>
    )
}

export default Country;