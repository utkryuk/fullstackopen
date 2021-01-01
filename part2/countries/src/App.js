import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'


const App = () => {
  
  const [countries, setCountries] = useState([])
  const [inputCountry, setCountry] = useState("")

  // const [showCountry, setShowCountry] = useState()
  // const [filterCountries, setFilterCountries] = useState([])

  const countryHook = () => {

    axios
    .get("https://restcountries.eu/rest/v2/all")
    .then(response => {
      setCountries(response.data)
    })
  }

  useEffect(countryHook, [])


  // const handleFilterCountries = () => {
  //   // countries.filter((country) => {
      
  //   // })
  //   var a = countries.filter((country) => {
  //     return country.name.toLowerCase() === inputCountry.toLowerCase()
  //   })

  //   console.log(a)
  // }

  const handleCountryChange = (event) => {
    // console.log("hi", event)
    setCountry(event.target.value)
  }

  const handleClick = (event, country) => {
    // console.log(event.target.value)
    // console.log(country.name)
    // setShowCountry(country)
    setCountry(country.name)
  }

  // console.log(process.env.REACT_APP_API_KEY)
  return (
    <div>
      <Filter inputCountry = {inputCountry} handleCountryChange = {handleCountryChange} />
      <Countries countries = {countries} inputCountry = {inputCountry} handleClick = {handleClick} />
    </div>
  )
}

export default App;