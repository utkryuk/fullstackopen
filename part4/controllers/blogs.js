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


blogsRouter.post('/', async (request, response, next) => {

    const body = request.body

    try {
        // console.log(token)
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        
        if(!request.token || !decodedToken.id) {
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

        const decodedToken = await jwt.verify(request.token, process.env.SECRET)

        if (!decodedToken.id || !request.token) {
            return response.status(401).send({error: 'token missing or invalid'})
        }

        const blog = await Blog.findById(request.params.id)

        if (blog.user.toString() === decodedToken.id.toString()) {
            await blog.remove()
            // user.blogs = user.blogs.concat(savedBlog._id) // Important
            // await user.save() // Important

            return response.status(204).end()
        }
        else {
            return response.status(401).end()
        }

    }
    catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {

    try {
        
        const decodedToken = await jwt.verify(request.token, process.env.SECRET)

        if (!decodedToken.id || !request.token) {
            return response.status(401).send({error: 'token missing or invalid'})
        }

        const blog = await Blog.findById(request.params.id)

        if (blog.user.toString() === decodedToken.id.toString()) {

            const body = request.body

            const toUpdateBlog = {
                title: body.title,
                author: body.author,
                url: body.url,
                likes: body.likes
            }

            const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, toUpdateBlog, {new: true})
            return response.json(updatedBlog)
        }
        else {
            return response.status(401).end()
        }

        
    }
    catch(exception) {
        next(exception)
    }
    // const body = request.body

    // const toUpdateBlog = {
    //     title: body.title,
    //     author: body.author,
    //     url: body.url,
    //     likes: body.likes
    // }

    // try {
    //     const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, toUpdateBlog, {new: true})
    //     return response.json(updatedBlog)
    // }
    // catch (exception) {
    //     next(exception)
    // }
})

module.exports = blogsRouter