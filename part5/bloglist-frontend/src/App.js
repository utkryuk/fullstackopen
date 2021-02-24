import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLoginFormSubmit = (event) => {
    event.preventDefault()

    const userData = {
      username: username,
      password: password
    }

    loginService
      .login(userData)
      .then(userData => {
        setUser(userData)
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(userData))
        setUserName('')
        setPassword('')

      })
      .catch((error) => alert(`${error}`))
  }

  const loginForm = () => (
    <div>
      <form onSubmit={handleLoginFormSubmit}>
        <div>
          username
          <input type = 'text' value = {username} onChange = {({target}) => (setUserName(target.value))}/>
        </div>
        <div>
          password
          <input type = 'password' value = {password} onChange = {({target}) => (setPassword(target.value))} />
        </div>
        <div>
          <button type = 'submit'>login</button>
        </div>
      </form>
    </div>
  )
  

  
  return (
    <div>
      {
        user === null
          ? loginForm():
          <Blogs blogs = {blogs} user = {user}/>
      }
    </div>
  )
}

export default App