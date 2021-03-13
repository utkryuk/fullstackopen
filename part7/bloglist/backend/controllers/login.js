const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {

    const body = request.body
    const user = await User.findOne({username: body.username})

    const passwordCorrect = (user === null) ? false : await bcrypt.compare(body.password, user.passwordHash)

    if (!(passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userInfoToBeTokenize = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userInfoToBeTokenize, process.env.SECRET)

    return response.send({token, username: user.username, name: user.name})

})

module.exports = loginRouter