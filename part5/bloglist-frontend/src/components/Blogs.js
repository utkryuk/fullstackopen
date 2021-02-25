import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'

const Blogs = ({blogs, setBlogs, user, setUser, setSuccessMessage}) => {

    const handleLogoutButton = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    return (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in<button onClick = {handleLogoutButton}>logout</button></p>
            <BlogForm blogs= {blogs} setBlogs = {setBlogs} setSuccessMessage = {setSuccessMessage}/>
            {blogs.map(blog => {
                return <Blog key={blog.id} user = {user} blog = {blog} />
            })}
        </div>
    )
}

export default Blogs