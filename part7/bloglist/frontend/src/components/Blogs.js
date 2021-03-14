import React, { useEffect } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from '../reducers/blogsReducer'
import LoginMessage from './LoginMessage'

const Blogs = () => {

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(initialBlogs())
    }, [dispatch])

    const blogs = useSelector(state => state.blogs)
        .sort((a, b) => {
            return b.likes - a.likes
        })
    
    
    return (
        <div>
            <h2>Blogs</h2>
            <LoginMessage />
            <BlogForm />
            {blogs.map(blog => {
                return <Blog key = {blog.id} blog = {blog} />
            })}
        </div>
    )
}

export default Blogs