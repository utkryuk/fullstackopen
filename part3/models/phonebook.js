const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.URI

// console.log(url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log(`error connecting to MongoDB: ${error.message}`)
    })


// const phoneSchema = new mongoose.Schema({
//     name: String,
//     number: String
// })

const phoneSchema = new mongoose.Schema({

    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true
    },
    number: {
        type: String,
        minlength: 8,
        required: true
    }
})

phoneSchema.plugin(uniqueValidator)

// Phonebook.findOneAndUpdate(
//     // { email: 'old-email@example.com' },
//     // { email: 'new-email@example.com' },
//     { runValidators: true, context: 'query' },
// )

phoneSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('phonebook', phoneSchema)
