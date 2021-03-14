import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'

const Blogs = ({ blogs, setBlogs, user, setUser }) => {

    const handleLogoutButton = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    // console.log(blogs)
    return (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in<button onClick = {handleLogoutButton} className = 'logout-btn'>logout</button></p>
            <BlogForm blogs= {blogs} setBlogs = {setBlogs}/>
            {blogs
                .sort((a, b) => {
                    return b.likes - a.likes
                })
                .map(blog => {
                    return <Blog key={blog.id} blogs = {blogs} setBlogs = {setBlogs} user = {user} blog = {blog} />
                })}
        </div>
    )
}

export default Blogs