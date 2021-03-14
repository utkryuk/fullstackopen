import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { useSelector } from 'react-redux'

const Blogs = ({ user, setUser }) => {

    const blogs = useSelector(state => state.blogs)
        .sort((a, b) => {
            return b.likes - a.likes
        })
    
    const handleLogOutButton = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    return (
        <div>
            <h2>Blogs</h2>
            <p>{user.name} loggen in<button onClick = {handleLogOutButton} className = 'logout-btn'>logout</button></p>
            <BlogForm />
            {blogs.map(blog => {
                return <Blog key = {blog.id} blogs = {blogs} user = {user} blog = {blog} />
            })}
        </div>
    )
}
// const Blogs = ({ blogs, setBlogs, user, setUser }) => {

//     const handleLogoutButton = (event) => {
//         event.preventDefault()
//         window.localStorage.removeItem('loggedBlogAppUser')
//         setUser(null)
//     }

//     return (
//         <div>
//             <h2>blogs</h2>
//             <p>{user.name} logged in<button onClick = {handleLogoutButton} className = 'logout-btn'>logout</button></p>
//             {/* <BlogForm blogs= {blogs} setBlogs = {setBlogs}/> */}
//             <BlogForm />
//             {blogs
//                 .sort((a, b) => {
//                     return b.likes - a.likes
//                 })
//                 .map(blog => {
//                     return <Blog key={blog.id} blogs = {blogs} setBlogs = {setBlogs} user = {user} blog = {blog} />
//                 })}
//         </div>
//     )
// }

export default Blogs