import React from 'react'
import LoginMessage from './LoginMessage'

const User = ({ user }) => {
    
    if (!user) {
        return null
    }
    
    return (
        <div>
            <h2>blogs</h2>
            <LoginMessage />
            <div>
                <h1>{user.name}</h1>                
                <h3>added blogs</h3>
                <ul>
                    {user.blogs.map(blog => {
                        return <li key = {blog.id}>{blog.title}</li>
                    })}
                </ul>
            </div>
            
        </div>
    )
}

export default User