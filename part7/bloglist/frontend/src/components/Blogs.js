import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { logout } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'

const Blogs = () => {

    const user = useSelector(state => state.login)
    
    const blogs = useSelector(state => state.blogs)
        .sort((a, b) => {
            return b.likes - a.likes
        })
    
    const dispatch = useDispatch()

    const handleLogOutButton = (event) => {
        event.preventDefault()
        dispatch(logout())
    }
    
    return (
        <div>
            <h2>Blogs</h2>
            <p>{user.name} loggen in<button onClick = {handleLogOutButton} className = 'logout-btn'>logout</button></p>
            <BlogForm />
            {blogs.map(blog => {
                return <Blog key = {blog.id} blogs = {blogs} blog = {blog} />
                // return <Blog key = {blog.id} blogs = {blogs} user = {user} blog = {blog} />
            })}
        </div>
    )
}

export default Blogs