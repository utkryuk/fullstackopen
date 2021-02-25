import React, {useState, useRef} from 'react'
import blogService from '../services/blogs'
import Toggelable from './Toggelable'

const BlogForm = ({blogs, setBlogs, setSuccessMessage}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const blogFormRef = useRef()

    const handleSubmitBlogForm = (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url
        }

        blogFormRef.current.toggleVisibility()

        blogService
            .createBlog(newBlog)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setSuccessMessage(title)
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 5000)
                
                setTitle('')
                setAuthor('')
                setUrl('')        
            })
            .catch(error => alert(`${error}`))
    }

    return (
        <div>
            <Toggelable buttonLabel = 'new blog' ref = {blogFormRef}>
                <h2>create new</h2>
                <form onSubmit = {handleSubmitBlogForm}>
                    <div>
                        title:<input type='text' value = {title} onChange={({target}) => setTitle(target.value)} />
                    </div>
                    <div>
                        author:<input type='text' value = {author} onChange={({target}) => setAuthor(target.value)} />
                    </div>
                    <div>
                        url:<input type='text' value = {url} onChange={({target}) => setUrl(target.value)} />
                    </div>
                    <div>
                        <button type='submit'>create</button>
                    </div>
                </form>
            </Toggelable>
        </div>
    )
}

export default BlogForm