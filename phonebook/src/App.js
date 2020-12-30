import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

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

  const filterNameChange = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
      filter shown with<input value = {filterName} onChange = {filterNameChange} />
      </div>

      <h2>add a new</h2>
      <div>
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
      </div>

      <h2>Numbers</h2>
      <div>
      <ul>
        {persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())).map((person) => {
          return <li key={person.name}>{person.name} {person.number}</li>
        })}
      </ul>
      </div>
    </div>
  )

}

// const Number = ({persons}) => {
//   persons.
//   return (
//   )
// }

export default App;