const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {

    const body = request.body

    if (body.password === undefined || body.password.length < 3) {
        return response.status(400).json({
            error: 'password is too short or missing'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        name: body.name,
        username: body.username,
        passwordHash
    })

    try {
        const savedUser = await user.save()
        return response.json(savedUser)
    }
    catch (exception) {
        next(exception)
    }

})

module.exports = usersRouter