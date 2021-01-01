import React from 'react'
import Country from './Country'

const Countries = (props) => {

    // console.log(props.countries)
    const filteredCountries = props.countries
    .filter((country) => {
        return country.name.toLowerCase()
        .includes(props.inputCountry.toLowerCase())
    })

    // if (props.showCountry !== undefined){
    //     var ans = props.showCountry
    //     // props.setShowCountry(undefined)
    //     // console.log(props.showCountry)
    //     // props.showCountry = undefined

    //     return (
    //         <Country country = {ans} />
    //     )
    // }

    if (filteredCountries.length === 1){
        // console.log(filteredCountries)
        return (
            <div>
                <Country country = {filteredCountries[0]} />
            </div>
        )
    }

    if (filteredCountries.length !== 1 && filteredCountries.length <= 10){
        return (
            <div>
                {filteredCountries.map((country) => {
                    return <div key = {country.name}>{country.name}<button value = {country} onClick = {(event) => {
                        props.handleClick(event, country)
                    }}>show</button></div>
                })}
            </div>
        )
    }

    return (
        <div>
            Too many matches, specify another filter            
        </div>
    )
}

export default Countries;