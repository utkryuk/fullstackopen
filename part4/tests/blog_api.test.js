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

describe('receiving blogs', () => {

    test('GET request to /api/blogs', async () => {

        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        // console.log(blogs.body)

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    


})

describe('when a new blog is added', () => {

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
    
})

test('Checking that unique property is named id', async() => {

    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body[0].id).toBeDefined()
})

describe('deletion of a blog', () => {

    test('DELETE api/blogs/id if id is valid', async () => {

        const blogsAtStart = await helper.blogsInDB()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsInEnd = await helper.blogsInDB()

        expect(blogsInEnd).toHaveLength(helper.initialBlogs.length - 1)

        const allTitles = blogsInEnd.map(blog => blog.title)

        expect(allTitles).not.toContain(blogToDelete.title)
    })

    test('DELETE api/blogs/id if id is invalid then 400', async () => {

        const blogsAtStart = await helper.blogsInDB()

        await api
            .delete('/api/blogs/52213')
            .expect(400)

        expect(blogsAtStart).toHaveLength(helper.initialBlogs.length)
        
    })
})


describe('updation of a blog', () => {

    test('PUT /api/blogs/id if id is valid', async () => {

        const blogsAtStart = await helper.blogsInDB()
        const blogToUpdate = blogsAtStart[0]

        blogToUpdate.title = 'First title changed'
        blogToUpdate.url = 'url.com'

        const updatedBlog = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        
        const processedBlog = JSON.parse(JSON.stringify(blogToUpdate))

        expect(updatedBlog.body).toEqual(processedBlog)
    })

    test('PUT /api/blogs/id if id invalid then 400', async () => {

        const blogsAtStart = await helper.blogsInDB()

        await api
            .put('/api/blogs/343123123')
            .send(blogsAtStart[0])
            .expect(400)
        
        expect(blogsAtStart).toHaveLength(helper.initialBlogs.length)
    })
})

afterAll (() => {
    mongoose.connection.close()
})