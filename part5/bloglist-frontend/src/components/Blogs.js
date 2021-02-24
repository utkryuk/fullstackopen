import React from 'react'
import Blog from './Blog'

const Blogs = ({blogs, user}) => {

    return (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
            {blogs.map(blog => {
                return <Blog key={blog.id} blog = {blog} />
            })}
        </div>
    )
}

export default Blogs