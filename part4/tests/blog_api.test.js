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
    
    test.only('POST request to /api/blogs', async () => {

        const newBlog = {
            title: 'Hello from testing',
            author: 'Utkarsh Gupta',
            url: 'hello.com',
            likes: 69
        }

        const savedBlog = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const allBlogs = await api
            .get('/api/blogs')

        expect(allBlogs.body).toHaveLength(helper.initialBlogs.length + 1)

        expect(savedBlog.body.title).toBe('Hello from testing')
        expect(savedBlog.body.author).toBe('Utkarsh Gupta')
        expect(savedBlog.body.url).toBe('hello.com')
        expect(savedBlog.body.likes).toBe(69)
    })

})

test('Checking that unique property is named id', async() => {

    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body[0].id).toBeDefined()
})

afterAll (() => {
    mongoose.connection.close()
})