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

describe('Blog Api Testing', () => {

    test('GET request to /api/blogs', async () => {

        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // console.log(blogs.body)

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    
    test('POST request to /api/blogs', async () => {

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

        const blogsInEnd = await helper.blogsInDB()

        expect(blogsInEnd).toHaveLength(helper.initialBlogs.length + 1)

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

test('POST /api/blogs : missing likes property gives default value as 0', async () => {

    const newBlog = {
        title: 'Without Like Property',
        author: 'Utkarsh Gupta',
        url: 'www.example.com'
    }

    const savedBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsInEnd = await helper.blogsInDB()

    expect(blogsInEnd).toHaveLength(helper.initialBlogs.length + 1)

    expect(savedBlog.body.likes).toBe(0)
    
})

test('POST /api/blogs : missing title and url gives status 400', async () => {

    const newBlog = {
        author: 'Utkarsh Gupta'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsInEnd = await helper.blogsInDB()

    expect(blogsInEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll (() => {
    mongoose.connection.close()
})