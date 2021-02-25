import React, {useState} from 'react'

const Blog = ({ blog, user}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
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

  return (
    <div style = {blogStyle}>
      <div style = {hideFullBlog}>
        {blog.title} {blog.author}<button onClick = {toggleVisibility}>view</button>
      </div>
      <div style = {showFullBlog}>
        {blog.title} {blog.author}<button onClick = {toggleVisibility}>hide</button>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button>like</button></div>
        <div>{user.name}</div>
      </div>
    </div>
  )
}

export default Blog
