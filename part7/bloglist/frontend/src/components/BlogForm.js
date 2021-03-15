import React, { useState, useRef } from 'react'
import Toggelable from './Toggelable'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'

const BlogForm = () => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()

    const blogFormRef = useRef()

    const handleSubmitBlogForm = (event) => {
        event.preventDefault()

        blogFormRef.current.toggleVisibility()

        dispatch(addBlog(title, author, url)) // error handling in addBlog left
    
        dispatch(setNotification(title, 5, true))
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <Toggelable buttonLabel = 'create new blog' ref = {blogFormRef}>
                <h2>create new</h2>
                <form onSubmit = {handleSubmitBlogForm}>
                    <div>
                        title:<input type='text' className = 'blog-title' value = {title} onChange={({ target }) => setTitle(target.value)} required/>
                    </div>
                    <div>
                    author:<input type='text' className = 'blog-author' value = {author} onChange={({ target }) => setAuthor(target.value)} required/>
                    </div>
                    <div>
                    url:<input type='text' className = 'blog-url' value = {url} onChange={({ target }) => setUrl(target.value)} required/>
                    </div>
                    <div>
                        <button type='submit' className = 'blog-submit'>create</button>
                    </div>
                </form>
            </Toggelable>
        </div>
    )
}

export default BlogForm