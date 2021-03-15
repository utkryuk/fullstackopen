import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { useHistory } from 'react-router-dom'

const Blog = ({ blog }) => {

    const user = useSelector(state => state.login)
    const dispatch = useDispatch()
    const history = useHistory()
    // console.log(blog, user)
    const isRemove = (blog !== undefined && user !== null && blog!== null && user.username === blog.username)
    const [removeButton, ] = useState(isRemove)

    if (!blog || !user) {
        return null
    }

    const handleLikeBlog = (event) => {
        event.preventDefault()
        dispatch(likeBlog(blog))
    }

    const handleRemoveBlog = (event) => {
        event.preventDefault()
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(deleteBlog(blog.id))
            history.push('/')
        }
    }

    const showRemoveBlogButton = () => (
        <div><button className = 'removeBlog-btn' onClick = {handleRemoveBlog}>remove</button></div>
    )

    return (
        <div>
            <h2>{blog.title} by {blog.author}</h2>
            <div className = 'url'>
                <a href = {blog.url} target = '_blank' rel = 'noopener noreferrer'>{blog.url}</a>
            </div>
            <div className = 'likes'>
                likes
                <span className = 'likes-number'> {blog.likes}</span>
                <button className = 'addLikes-btn' onClick = {handleLikeBlog}>like</button>
            </div>
            <div className = 'user'>
                added by {user.name}
            </div>
            {removeButton && showRemoveBlogButton()}
        </div>            
    )
}

export default Blog
