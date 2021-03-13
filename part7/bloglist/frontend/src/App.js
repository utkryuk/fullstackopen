import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)


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
            blogService.setToken(user.token)
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
            .catch(() => {
                setErrorMessage('wrong username or password')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
    }

    const loginForm = () => (
        <LoginForm handleLoginFormSubmit = {handleLoginFormSubmit} username = {username} setUserName  = {setUserName} password = {password} setPassword = {setPassword} />
    )
    return (
        <div>
            <Notification successMessage = {successMessage} errorMessage = {errorMessage} />
            {
                user === null
                    ? loginForm():
                    <Blogs blogs = {blogs} setBlogs = {setBlogs} user = {user} setUser = {setUser} setSuccessMessage = {setSuccessMessage}/>
            }
        </div>
    )
}

export default App