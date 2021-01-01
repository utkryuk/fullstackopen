import React from 'react'

const Weather = ({city, current}) => {
    // console.log(current)
    // console.log(city)
    return (
        <div>
            <h3>Weather in {city}</h3>
            temperature: {current.temperature} Celsius<br />
            <img src = {current.weather_icons} alt = {`Weather in ${city}`} width = "15%" height = "15%"></img><br />
            wind: {current.wind_speed} mph direction {current.wind_dir}<br />
        </div>
    )
}

export default Weather;