import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Countries from './components/Countries'
import Filter from './components/Filter'


const App = () => {
  
  const [countries, setCountries] = useState([])
  const [inputCountry, setCountry] = useState("")
  // const [filterCountries, setFilterCountries] = useState([])

  const hook = () => {

    axios
    .get("https://restcountries.eu/rest/v2/all")
    .then(response => {
      setCountries(response.data)
    })
  }

  useEffect(hook, [])

  // const handleFilterCountries = () => {
  //   // countries.filter((country) => {
      
  //   // })
  //   var a = countries.filter((country) => {
  //     return country.name.toLowerCase() === inputCountry.toLowerCase()
  //   })

  //   console.log(a)
  // }

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  return (
    <div>
      <Filter inputCountry = {inputCountry} handleCountryChange = {handleCountryChange} />
      <Countries countries = {countries} inputCountry = {inputCountry}/>
    </div>
  )
}

export default App;