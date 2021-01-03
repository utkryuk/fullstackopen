import React, { useState, useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [addPersonMessage, setAddPersonMessage] = useState(null)


  const hook = () => {

    personService.getAll()
    .then(allPersons => {
      setPersons(allPersons)
    })
  }

  useEffect(hook, []);
  
  // Function checks whether the entered name is present in the original list.
  const checkPhoneBookIfNameAlreadyExist = () => {
    // console.log(persons.map((value) => value.name))

    // var check = persons.map((value) => value.name)
    // debugger;
    if (persons.map(person => person.name).some(name => name === newName)){
      return true
    }
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log(event)

    if (!checkPhoneBookIfNameAlreadyExist()){
      // var newPersons = persons.concat({ name: newName, number: newNumber})
      var newPerson = {name: newName, number: newNumber}

      personService.addPerson(newPerson)
      .then((newPerson) => {
        setPersons(persons.concat(newPerson))
      })

      // Notification message
      setAddPersonMessage(`Added ${newPerson.name}`)
      setTimeout(() => {
        // The notification will be there for 5 sec and then will be removed.
        setAddPersonMessage(null)
      }, 5000)
      // console.log(newPerson)
      
      setNewName('')
      setNewNumber('')
    }
    else{
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          updateNumberWithSameName()
      }
      else{
        setNewName('')
        setNewNumber('')
      }
    }
  }

  const updateNumberWithSameName = () => {
    
    const contactDetailsToUpdate = persons.find((person) => person.name === newName)

    const copyOfContactDetailsToUpdate = {...contactDetailsToUpdate, number: newNumber}

    personService.updatePerson(copyOfContactDetailsToUpdate)
    .then((updatedPerson) => {
      // console.log(updatedPerson)
      setPersons(persons.map((person) => {
        return (person.id === contactDetailsToUpdate.id) ? updatedPerson: person
      }))
      setNewName('')
      setNewNumber('')
    })
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

  const handleDeleteClick = (event, id) => {

    if (window.confirm(`Delete ${event.target.value} ?`)){
      // const toDeletePerson = persons.filter()
      // personService.deletePerson(personToBeDeleted)
      const personToBeDeleted = persons.find(person => person.id === id)


      const copyDeleted = {...personToBeDeleted}
      // console.log(copyDeleted)

      personService
      .deletePerson(copyDeleted)
      .then((deletedPersonWhichIsActuallyEmptyNow) => {
        // console.log(copyDeleted)
        setPersons(persons.filter(person => person.id !== copyDeleted.id))
      })
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {addPersonMessage} />
      <Filter filterName = {filterName} filterNameChange = {filterNameChange}/>

      <h2>add a new</h2>
      <PersonForm handleFormSubmit = {handleFormSubmit} newName = {newName} newNumber = {newNumber} handleNumberChange = {handleNumberChange} handleNameChange = {handleNameChange} />

      <h2>Numbers</h2>
      <Persons persons = {persons} filterName = {filterName} handleDeleteClick = {handleDeleteClick}/>
    </div>
  )

}

export default App;