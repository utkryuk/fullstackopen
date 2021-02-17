const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

let userTokenForTesting
let testerUser

beforeAll(async () => {

    await User.deleteMany({})
    const newUserForTesting1 = {
        username: 'newUserForTesting1',
        name: 'User Testing',
        password: 'hello there'
    }

    const userResponse = await api
        .post('/api/users')
        .send(newUserForTesting1)

    testerUser = userResponse.body

    // console.log(testerUser)

    const newLoginSession = {
        username: 'newUserForTesting1',
        password: 'hello there'
    }

    const tokenResponse = await api
        .post('/api/login')
        .send(newLoginSession)

    userTokenForTesting = tokenResponse.body.token
})

beforeEach(async () => {
    await Blog.deleteMany({})

    for (const blog of helper.initialBlogs) {
        let blogObj = new Blog(blog)
        blogObj.user = testerUser.id
        // console.log(blogObj)
        await blogObj.save()
    }
})

test('Checking that unique property is named id', async() => {

    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body[0].id).toBeDefined()
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

    test('/api/blogs', async () => {

        const newBlog = {
            title: 'Hello from testing',
            author: 'Utkarsh Gupta',
            url: 'hello.com',
            likes: 69
        }

        const savedBlog = await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${userTokenForTesting}`)
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

    test('missing likes property gives default value as 0', async () => {

        const newBlog = {
            title: 'Without Like Property',
            author: 'Utkarsh Gupta',
            url: 'www.example.com'
        }
    
        const savedBlog = await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${userTokenForTesting}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const blogsInEnd = await helper.blogsInDB()
    
        expect(blogsInEnd).toHaveLength(helper.initialBlogs.length + 1)
    
        expect(savedBlog.body.likes).toBe(0)
        
    })
    
    test('missing title and url gives status 400', async () => {
    
        const newBlog = {
            author: 'Utkarsh Gupta'
        }
    
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${userTokenForTesting}`)
            .send(newBlog)
            .expect(400)
    
        const blogsInEnd = await helper.blogsInDB()
    
        expect(blogsInEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('if token is not provided then 401 error', async () => {

        const blogsAtStart = await helper.blogsInDB()

        const addBlog = {
            title: 'error 401',
            author: 'tester',
            url: 'testingjest.com',
            likes: 54,
        }

        await api
            .post('/api/blogs')
            .send(addBlog)
            .expect(401)
        

        const blogsAtEnd = await helper.blogsInDB()

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    })
    
})



describe('deletion of a blog', () => {

    test('if id & token is valid', async () => {

        const blogsAtStart = await helper.blogsInDB()
        const blogToDelete = blogsAtStart[1]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${userTokenForTesting}`)
            .expect(204)

        const blogsInEnd = await helper.blogsInDB()

        expect(blogsInEnd).toHaveLength(helper.initialBlogs.length - 1)

        const allTitles = blogsInEnd.map(blog => blog.title)

        expect(allTitles).not.toContain(blogToDelete.title)
    })

    test('if id is invalid then 400', async () => {

        const blogsAtStart = await helper.blogsInDB()

        await api
            .delete('/api/blogs/52213')
            .set('Authorization', `bearer ${userTokenForTesting}`)
            .expect(400)

        expect(blogsAtStart).toHaveLength(helper.initialBlogs.length)
        
    })

    test('if token is invalid then 401', async () => {

        const blogsAtStart = await helper.blogsInDB()
        const blogToDelete = blogsAtStart[0]

        let wrongToken = `${userTokenForTesting.slice(0, -2)}gh`

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${wrongToken}`)
            .send(blogToDelete)
            .expect(401)

        const blogsAtEnd = await helper.blogsInDB()

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    })
})


describe('updation of a blog', () => {

    test('if id & token is valid', async () => {

        const blogsAtStart = await helper.blogsInDB()
        let blogToUpdate = blogsAtStart[0]
        
        blogToUpdate.title = 'First title changed'
        blogToUpdate.url = 'url.com'

        const updatedBlog = await api
            .put(`/api/blogs/${blogsAtStart[0].id}`)
            .set('Authorization', `bearer ${userTokenForTesting}`)
            .send(blogToUpdate)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        
        const processedBlog = JSON.parse(JSON.stringify(blogToUpdate))

        expect(updatedBlog.body).toEqual(processedBlog)
    })

    test('if id invalid then 400', async () => {

        const blogsAtStart = await helper.blogsInDB()

        await api
            .put('/api/blogs/343123123')
            .set('Authorization', `bearer ${userTokenForTesting}`)
            .send(blogsAtStart[0])
            .expect(400)
        
        expect(blogsAtStart).toHaveLength(helper.initialBlogs.length)
    })

    test('if token is invalid then 401', async () => {

        const blogsAtStart = await helper.blogsInDB()
        const blogToDelete = blogsAtStart[0]

        let wrongToken = `${userTokenForTesting.slice(0, -2)}gh`

        await api
            .put(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${wrongToken}`)
            .send(blogToDelete)
            .expect(401)

        const blogsAtEnd = await helper.blogsInDB()

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    })
})

afterAll (() => {
    mongoose.connection.close()
})