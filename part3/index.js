const { request, response } = require('express')
const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())

// app.use(morgan('tiny'))

morgan.token('body', (request, response) => {
    if(request.method === "POST"){
        return JSON.stringify(request.body)
    }
    else
        return ""
})

app.use(morgan((tokens, request, response) => {
    return [
        tokens.method(request, response),
        tokens.url(request, response),
        tokens.status(request, response),
        tokens.res(request, response, 'content-length'), '-',
        tokens['response-time'](request, response), 'ms', 
        tokens.body(request, response)
    ].join(' ')
}))
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))



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

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    persons = persons.filter(person => person.id !== id)

    response.status(204).end()

})


const generateId = () => {
    return Math.ceil((Math.random()*9999 + 1))
}


app.post('/api/persons', (request, response) => {
    const body = request.body
    // console.log(body)
    
    if(body.name && body.number){
        if (persons.some(person => person.name === body.name)){
            return response.status(400).send({error: 'name must be unique'})
        }    
        const new_person = {
            id: generateId(),
            name: body.name,
            number: body.number
        }
        
        persons = persons.concat(new_person)
                
        return response.json(new_person)    
    }
    else{
        response.status(400).send({error: 'one of the parameter is empty'})
    }
    // console.log("sdgsdg")
})


const unknownRoute = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownRoute)

const PORT = 3001

app.listen(PORT)
console.log(`The server is running on ${PORT}`)