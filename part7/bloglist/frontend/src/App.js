import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { initialBlogs } from './reducers/blogsReducer'

const App = () => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initialBlogs())
    }, [dispatch])

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
                dispatch(setNotification(`wrong username or password`, 5, false))
            })
    }

    const loginForm = () => (
        <LoginForm handleLoginFormSubmit = {handleLoginFormSubmit} username = {username} setUserName  = {setUserName} password = {password} setPassword = {setPassword} />
    )
    return (
        <div>
            <Notification />
            {
                user === null
                    ? loginForm():
                    <Blogs user = {user} setUser = { setUser} />
            }
        </div>
    )
}

export default App