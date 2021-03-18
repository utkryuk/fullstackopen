import React, { useState, useRef } from 'react'
import Toggelable from './Toggelable'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { Button, makeStyles, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const BlogForm = () => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()
    const classes = useStyles()

    const blogFormRef = useRef()

    const handleSubmitBlogForm = (event) => {
        event.preventDefault()

        blogFormRef.current.toggleVisibility()

        dispatch(addBlog(title, author, url))
    
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <Toggelable buttonLabel = 'create new blog' ref = {blogFormRef}>
                <h2>CREATE BLOG</h2>
                <form className = {classes.root} onSubmit = {handleSubmitBlogForm}>

                    <div>
                        <TextField id = 'outlined-basic' value = {title} label = 'Title' onChange = {({ target }) => (setTitle(target.value))} required />
                    </div>
                    <div>
                        <TextField id = 'outlined-basic' value = {author} label = 'Author' onChange = {({ target }) => (setAuthor(target.value))} required/>
                    </div>
                    <div>
                        <TextField id = 'outlined-basic' value = {url} label = 'Url' onChange = {({ target }) => (setUrl(target.value))} required />
                    </div>
                    <div>
                        <Button type = 'submit' className = 'blog-submit' variant = 'contained' color = 'primary'>CREATE</Button>
                    </div>
                </form>
            </Toggelable>
        </div>
    )
}

export default BlogForm