import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'

const Blogs = ({blogs, setBlogs, user, setUser}) => {

    const handleLogoutButton = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    return (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in<button onClick = {handleLogoutButton}>logout</button></p>
            <BlogForm blogs= {blogs} setBlogs = {setBlogs}/>
            {blogs.map(blog => {
                return <Blog key={blog.id} blog = {blog} />
            })}
        </div>
    )
}

export default Blogs