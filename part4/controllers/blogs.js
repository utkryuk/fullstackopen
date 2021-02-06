const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    
    const blogs = await Blog.find({})
    return response.json(blogs)
})

blogsRouter.post('/', (request, response) => {

    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog.save()
        .then(savedBlog => {
            return response.json(savedBlog)
        })
        .catch(error => {
            console.log('error', error.message)
        })
})

module.exports = blogsRouter