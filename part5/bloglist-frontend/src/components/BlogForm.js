import React, {useState} from 'react'
import blogService from '../services/blogs'

const BlogForm = ({blogs, setBlogs, setSuccessMessage}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmitBlogForm = (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url
        }

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
        </div>
    )
}

export default BlogForm