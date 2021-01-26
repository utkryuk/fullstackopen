const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    
    Blog.find({})
        .then(blogs => {
            return response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {

    const body = request.body
    const blog = new Blog({
        body
    })

    blog.save()
        .then(savedBlog => {
            return response.json(savedBlog)
        })
        .catch(error => {
            console.log('error', error.message)
        })
})

module.exports = {
    blogsRouter
}