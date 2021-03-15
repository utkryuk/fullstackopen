import React, { useEffect } from 'react'
import BlogForm from './BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from '../reducers/blogsReducer'
import LoginMessage from './LoginMessage'
import { Link } from 'react-router-dom'

const Blogs = () => {

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(initialBlogs())
    }, [dispatch])

    const blogs = useSelector(state => state.blogs)
        .sort((a, b) => {
            return b.likes - a.likes
        })

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    
    
    return (
        <div>
            <h2>Blogs</h2>
            <LoginMessage />
            <BlogForm />
            {blogs.map(blog => {
                return <div key = {blog.id} style = {blogStyle}>
                    <Link to = {`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
                    </div>
            })
            }
        </div>
    )
}

export default Blogs