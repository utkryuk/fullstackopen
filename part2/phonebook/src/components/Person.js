import React from 'react'

const Person = ({person, handleDeleteClick}) => {
    return (
        <li>{person.name} {person.number}<button value = {person.name} onClick = {handleDeleteClick}>delete</button></li>
    )
}

export default Person;