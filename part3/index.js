// const { request, response } = require('express')
require('dotenv').config()

const Phonebook = require('./models/phonebook')

const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

// app.use(morgan('tiny'))

morgan.token('body', (request, ) => {
    if(request.method === 'POST'){
        return JSON.stringify(request.body)
    }
    else
        return ''
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

app.get('/api/persons', (request, response) => {
    Phonebook.find({}).then(phonebook => {
        return response.json(phonebook)
    })
    // response.json(persons)
})

app.get('/api/persons/:id', (request, response, next) => {

    Phonebook.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            }
            else{
                response.status(404).end()
            }
        })
        .catch(error => {
            next(error)
        })

    // const id = Number(request.params.id)

    // const person = persons.find(person => person.id === id)

    // if(person){
    //     response.json(person)
    // }
    // else{
    //     response.status(404).end()
    // }
})



app.delete('/api/persons/:id', (request, response, next) => {
    // const id = Number(request.params.id)

    // persons = persons.filter(person => person.id !== id)

    Phonebook.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => {
            next(error)
        })
})


app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const new_person = new Phonebook({
        name: body.name,
        number: body.number
    })

    new_person.save()
        .then(savedNote => {
            response.json(savedNote)
        })
        .catch(error => {
            next(error)
        })

    // if(body.name && body.number){
    //     Phonebook.find({}).then(persons => {
    //         if(persons.some(person => person.name === body.name)){
    //             return response.status(400).send({error: 'name must be unique'})
    //         }
    //     })
    // other code too
    // else{
    //     return response.status(400).send({error: 'one of the parameter is empty'})
    // }
})

app.put('/api/persons/:id', (request, response, next) => {

    // const {name, number} = request.body
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Phonebook.findByIdAndUpdate(request.params.id, person, { new: true,runValidators: true, context: 'query' })
        .then(updatedNote => {
            return response.json(updatedNote)
        })
        .catch(error => {
            next(error)
        })
})

// app.post('/api/persons', (request, response) => {
//     const body = request.body
//     // console.log(body)
//     if(body.name && body.number){
//         if (persons.some(person => person.name === body.name)){
//             return response.status(400).send({error: 'name must be unique'})
//         }
//         const new_person = {
//             id: generateId(),
//             name: body.name,
//             number: body.number
//         }
//         persons = persons.concat(new_person)
//         return response.json(new_person)
//     }
//     else{
//         response.status(400).send({error: 'one of the parameter is empty'})
//     }
//     // console.log("sdgsdg")
// })


const unknownRoute = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownRoute)


const errorHandler = (error, request, response, next) => {
    console.log(error.name)

    if(error.name === 'CastError'){
        return response.status(400).send({ error: 'malformatted id' })
    }

    if(error.name === 'ValidationError'){
        return response.status(400).send({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)



const PORT = process.env.PORT || 3001

app.listen(PORT)
console.log(`The server is running on ${PORT}`)