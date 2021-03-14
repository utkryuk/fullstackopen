import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'

const Blog = ({ blog }) => {

    const user = useSelector(state => state.login)
    const dispatch = useDispatch()

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

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
        dispatch(likeBlog(blog))
    }

    const handleRemoveBlog = (event) => {
        event.preventDefault()
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(deleteBlog(blog.id))
        }
    }

    const showRemoveBlogButton = () => (
        <div><button className = 'removeBlog-btn' onClick = {handleRemoveBlog}>remove</button></div>
    )

    return (
        <div style = {blogStyle} className = 'blogDiv'>
            <div style = {hideFullBlog} className = 'hideFullBlogDiv'>
                {blog.title} {blog.author}<button className = 'view-btn' onClick = {toggleVisibility}>view</button>
            </div>
            <div style = {showFullBlog} className = 'showFullBlogDiv'>
                {blog.title} {blog.author}
                <button className = 'hide-btn' onClick = {toggleVisibility}>hide</button>
                
                <div className = 'url'>
                    <a href= {blog.url} target='_blank' rel="noopener noreferrer">{blog.url}</a>
                </div>
                <div className = 'likes'>
                    likes 
                    <span className = 'likes-number'> {blog.likes}</span>
                    <button className = 'addLikes-btn' onClick = {handleLikeBlog}>like</button>
                </div>
                <div className = 'user'>
                    {user.name}
                </div>

                {removeButton === true && showRemoveBlogButton()}
            </div>
        </div>
    )
}

export default Blog
