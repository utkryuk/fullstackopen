import React from 'react'
import Person from './Person'

const Persons = ({persons, filterName, handleDeleteClick}) => {
    // console.log(persons, filterName)

    const filterPersons = persons.filter((person) => {
      return person.name.toLowerCase().includes(filterName.toLowerCase())
    })

    return (
        <div>
        <ul>
          {filterPersons.map((person) => {
            return <Person key={person.name} person = {person} handleDeleteClick = {(event) => handleDeleteClick(event, person.id)}/> // key prop is a feature in React not in html.
          })}
        </ul>
        </div>
    )
}

export default Persons;