const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        unique: true,
        minlength: 3,
        required: true
    },
    passwordHash: String,
    blogs : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
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