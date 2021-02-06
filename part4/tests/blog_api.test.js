const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (const blog of helper.initialBlogs) {
        let blogObj = new Blog(blog)
        await blogObj.save()
    }
})

describe('Note Api Testing', () => {

    test('GET request to /api/blogs', async () => {

        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // console.log(blogs.body)

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

})


afterAll (() => {
    mongoose.connection.close()
})