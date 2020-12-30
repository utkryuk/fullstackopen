import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' , number: '040-1234567'}])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      var newPersons = persons.concat({ name: newName, number: newNumber})
      // console.log(newx)
  
      setPersons(newPersons)
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value = {newNumber} onChange = {handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => {
          return <li key={person.name}>{person.name} {person.number}</li>
        })}
      </ul>
    </div>
  )

}

export default App;