import React from 'react'
import Blog from './Blog'

const Blogs = ({blogs, user, setUser}) => {

    const handleLogoutButton = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    return (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in<button onClick = {handleLogoutButton}>logout</button></p>
            {blogs.map(blog => {
                return <Blog key={blog.id} blog = {blog} />
            })}
        </div>
    )
}

export default Blogs