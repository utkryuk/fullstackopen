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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`)
})
