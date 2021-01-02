import React, { useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const hook = () => {

    personService.getAll()
    .then(allPersons => {
      setPersons(allPersons)
    })
  }

  useEffect(hook, []);
  
  // Function checks whether the entered name is present in the original list.
  const checkPhoneBook = () => {
    // console.log(persons.map((value) => value.name))

    // var check = persons.map((value) => value.name)
    // debugger;
    if (persons.map(person => person.name).some(name => name === newName)){
      alert(`${newName} is already added to phonebook`)
      return true
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log(event)

    if (!checkPhoneBook()){
      // var newPersons = persons.concat({ name: newName, number: newNumber})
      // console.log(newx)
      var newPerson = {name: newName, number: newNumber}

      personService.addPerson(newPerson)
      .then((newPerson) => {
        setPersons(persons.concat(newPerson))
      })

      // setPersons(newPersons)
      setNewName('')
      setNewNumber('')  
    }
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName = {filterName} filterNameChange = {filterNameChange}/>

      <h2>add a new</h2>
      <PersonForm handleFormSubmit = {handleFormSubmit} newName = {newName} newNumber = {newNumber} handleNumberChange = {handleNumberChange} handleNameChange = {handleNameChange} />

      <h2>Numbers</h2>
      <Persons persons = {persons} filterName = {filterName} />
    </div>
  )

}

export default App;