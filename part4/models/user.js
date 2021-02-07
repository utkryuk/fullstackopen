const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        unique: true
    },
    passwordHash: String
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform : (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString(),
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('User', userSchema)