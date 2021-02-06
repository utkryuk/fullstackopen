const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    
    const blogs = await Blog.find({})
    return response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {

    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })

    // blog.save()
    //     .then(savedBlog => {
    //         return response.json(savedBlog)
    //     })
    //     .catch(error => {
    //         console.log('error', error.message)
    //     })

    try {
        const savedBlog = await blog.save()
        response.json(savedBlog)    
    }
    catch (exception) {
        next(exception)
    }
    
})

blogsRouter.delete('/:id', async (request, response, next) => {

    try {
        await Blog.findByIdAndRemove(request.params.id)
        return response.status(204).end()
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter