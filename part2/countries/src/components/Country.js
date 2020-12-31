import React from 'react'

const Country = ({country}) => {
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
        </div>
    )
}

export default Country;