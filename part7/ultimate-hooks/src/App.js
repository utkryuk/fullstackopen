  
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const inputField = {
        type,
        value,
        onChange
    }

    return {
        inputField,
        setValue
    }
}

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        const getData = async () => {
            const temp = await axios.get(baseUrl)
            setResources(temp.data)
        }
        getData()
    }, [])

    const create = async (resource) => {
        const temp = await axios.post(baseUrl, resource)
        setResources(resources.concat(temp.data))
        // return temp.data
    }

    const service = {
        create
    }

    return [
        resources, service
    ]
}

const App = () => {
    const content = useField('text')
    const name = useField('text')
    const number = useField('text')

    const [notes, noteService] = useResource('http://localhost:3005/notes')
    const [persons, personService] = useResource('http://localhost:3005/persons')

    const handleNoteSubmit = async (event) => {
        event.preventDefault()
        try {
            await noteService.create({ content: content.inputField.value })
            content.setValue('')
        }
        catch(error) {
            alert(error)
        }
    }
 
    const handlePersonSubmit = async (event) => {
        event.preventDefault()
        try {
            await personService.create({ name: name.inputField.value, number: number.inputField.value})
            name.setValue('')
            number.setValue('')
        }
        catch(error) {
            alert(error)
        }
    }

    return (
        <div>
            <h2>notes</h2>
            <form onSubmit={handleNoteSubmit}>
                <input {...content.inputField} />
                <button type = 'submit'>create</button>
            </form>
            {notes.map(n => <p key={n.id}>{n.content}</p>)}

            <h2>persons</h2>
            <form onSubmit={handlePersonSubmit}>
                name <input {...name.inputField} /> <br/>
                number <input {...number.inputField} />
                <button type = 'submit'>create</button>
            </form>
            {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
        </div>
    )
}

export default App