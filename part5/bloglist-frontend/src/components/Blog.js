import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [likes, setLikes] = useState(blog.likes)
  const [visible, setVisible] = useState(false)

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
    console.log(blog)
    const newBlog = {
      user: user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    blogService
      .updateBlog(newBlog, blog.id)
      .then(() => {
        setLikes(likes + 1)
      })
  }

  return (
    <div style = {blogStyle}>
      <div style = {hideFullBlog}>
        {blog.title} {blog.author}<button onClick = {toggleVisibility}>view</button>
      </div>
      <div style = {showFullBlog}>
        {blog.title} {blog.author}<button onClick = {toggleVisibility}>hide</button>
        <div>{blog.url}</div>
        <div>likes {likes}<button onClick = {handleLikeBlog}>like</button></div>
        <div>{user.name}</div>
      </div>
    </div>
  )
}

export default Blog
