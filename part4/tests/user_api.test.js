const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('../tests/test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('when there is initially one user in the db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({
            username: 'root',
            passwordHash
        })

        await user.save()
    })

    test('POST /api/users : creating a user', async () => {
        
        const usersAtStart = await helper.usersInDB()

        const newUser = {
            name: 'Utkarsh Gupta',
            username: 'ryuk',
            password: 'deathnote'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDB()

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)

        expect(usernames).toContain(newUser.username)
    })

    test('POST /api/users fails if username already taken', async () => {

        const usersAtStart = await helper.usersInDB()

        const newUser = {
            username: 'root',
            name: 'Utkarsh',
            password: 'helloagain'
        }
        
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        const usersAtEnd = await helper.usersInDB()

        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll (() => {
    mongoose.connection.close()
})