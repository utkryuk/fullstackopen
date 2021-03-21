import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog, addBlogComment } from '../reducers/blogsReducer'
import { useHistory } from 'react-router-dom'
import { makeStyles, List, ListItem, ListItemText, Button, TextField, Link } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    formRoot: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    contentRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        }
    }
}))

const Blog = ({ blog }) => {

    const user = useSelector(state => state.login)
    const dispatch = useDispatch()
    const history = useHistory()
    // console.log(blog, user)
    const isRemove = (blog !== undefined && user !== null && blog!== null && user.username === blog.username)
    const [removeButton, ] = useState(isRemove)
    const [comment, setComment] = useState('')
    const classes = useStyles()

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
        <Button variant = 'contained' color = 'secondary' className = 'removeBlog-btn' onClick = {handleRemoveBlog}>remove</Button>
    )

    const addComment = (event) => {
        event.preventDefault()
        dispatch(addBlogComment(blog.id, comment))
        setComment('')
    }

    return (
        <div>
            <div>
                <h2>{blog.title} by {blog.author}</h2>
                <div className = 'url'>
                    <Link href = {blog.url} target = '_blank' rel = 'noopener noreferrer'>{blog.url}</Link>
                </div>
                <div className = 'likes'>
                    LIKES
                    <span className = 'likes-number'>{` ${blog.likes} `}</span>
                    <Button variant = 'contained' color = 'primary' onClick = {handleLikeBlog}>like</Button>
                </div>
                <div className = 'user'>
                    Added by {`${user.name} `}
                    {removeButton && showRemoveBlogButton()}
                </div>
            </div>
            <div>
                <h3>COMMENTS</h3>
                <div>
                    <form className = {classes.formRoot} noValidate onSubmit={addComment}>
                        <div>
                            <TextField id = 'outlined-basic' value = {comment} label = 'Comment' onChange = {({ target }) => (setComment(target.value))} placeholder = 'add comment...' required />
                        </div>
                        <Button type = 'submit' variant = 'contained' color = 'primary'>Add comment</Button>
                    </form>
                </div>
                <div>
                    <List component="nav" className={classes.root} aria-label={`comments ${blog.title}`}>
                        {blog.comments.map(comment => {
                            return <ListItem button key = {Math.random()*100000}>
                                <ListItemText primary = {comment} />
                            </ListItem>
                        })
                        }
                    </List>

                    {/* <ul>
                        {blog.comments.map(comment => {
                            return <li key = {Math.random()*100000}>{comment}</li>
                        })}
                    </ul> */}
                </div>
            </div>
        </div>
    )
}

export default Blog
