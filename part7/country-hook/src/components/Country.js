import React from 'react'

const Country = ({ country }) => {

    if (country) {
        return (
            <div>
                <div>
                    <h2>{country.name}</h2>
                </div>
                <div>
                    capital {country.capital}                
                </div>
                <div>
                    population {country.population}
                </div>
                <div>
                    <img src = {country.flag} height = '200px' alt = 'country-flag'/>
                </div>
            </div>
        )    
    }
    else {
        return (
            <div>
                not found...
            </div>
        )
    }
}

export default Country