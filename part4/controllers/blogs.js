const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    
    const blogs = await Blog
        .find({})
        .populate('user', {username: 1, name: 1})
    return response.json(blogs)
})

const extractToken = (request) => {

    const authorization = request.get('authorization')
    // console.log(authorization)
    if (authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }

    return null
}

blogsRouter.post('/', async (request, response, next) => {

    const body = request.body

    try {
        const token = await extractToken(request)
        // console.log(token)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        
        if(!token || !decodedToken.id) {
            return response.status(401).json({error : 'token missing or invalid'})
        }

        // console.log(decodedToken)
        const user = await User.findById(decodedToken.id)
        
        console.log(body)
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user._id
        })

        const savedBlog = await blog.save()
        
        user.blogs = user.blogs.concat(savedBlog._id) // Important
        await user.save() // Important

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

blogsRouter.put('/:id', async (request, response, next) => {

    const body = request.body

    const toUpdateBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, toUpdateBlog, {new: true})
        return response.json(updatedBlog)
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter