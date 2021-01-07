// const express = require('express')

// const app = express()


// app.get('/api/persons', (request, response) => {
//     response.json(persons)
// })


// const PORT = 3001
// app.listen(PORT, () => {
//     console.log(`The server is running on ${PORT}`)
// })

const { response } = require('express')
const express = require('express')

const app = express()


persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Utkarsh",
        number: "040-3456"
    },
    {
        id: 3,
        name: "Saurav",
        number: "123456"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people<br>${new Date()}<br>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    const person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    }
    else{
        response.status(404).end()
    }
})

const PORT = 3001

app.listen(PORT)
console.log(`The server is running on ${PORT}`)