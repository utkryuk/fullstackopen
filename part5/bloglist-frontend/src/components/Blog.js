import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blogs, setBlogs, blog, user }) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const [likes, setLikes] = useState(blog.likes)
    const [visible, setVisible] = useState(false)
    const [removeButton, ] = useState(user.username === blog.user.username)

    const hideFullBlog = {
        display: visible ? 'none' : ''
    }

    const showFullBlog = {
        display: visible ? '' : 'none'
    }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const handleLikeBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            user: user.id,
            likes: likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url
        }

        blogService
            .updateBlog(newBlog, blog.id)
            .then(() => {
                setLikes(likes + 1)
                const newBlogs = blogs.map((blogObj) => {
                    return blogObj.id === blog.id ? { ...blogObj, likes: likes } : blogObj
                })
                setBlogs(newBlogs)
            })
    }

    const handleRemoveBlog = (event) => {
        event.preventDefault()
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            blogService
                .deleteBlog(blog.id)
                .then(() => {
                    const newBlogs = blogs.filter((blogObj) => {
                        return blogObj.id !== blog.id
                    })
                    setBlogs(newBlogs)
                })
        }
    }

    const showRemoveBlogButton = () => (
        <div><button onClick = {handleRemoveBlog}>remove</button></div>
    )

    return (
        <div style = {blogStyle} className = 'blogDiv'>
            <div style = {hideFullBlog} className = 'hideFullBlogDiv'>
                {blog.title} {blog.author}<button onClick = {toggleVisibility}>view</button>
            </div>
            <div style = {showFullBlog} className = 'showFullBlogDiv'>
                {blog.title} {blog.author}<button onClick = {toggleVisibility}>hide</button>
                <div><a href= {blog.url} target='_blank' rel="noopener noreferrer">{blog.url}</a></div>
                <div>likes {likes}<button onClick = {handleLikeBlog}>like</button></div>
                <div>{user.name}</div>

                {removeButton === true && showRemoveBlogButton()}
            </div>
        </div>
    )
}

export default Blog
