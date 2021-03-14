import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from './reducers/blogsReducer'
import { login, initialLogin } from './reducers/loginReducer'

const App = () => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector(state => state.login)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initialLogin())
    }, [dispatch])

    useEffect(() => {
        dispatch(initialBlogs())
    }, [dispatch])

    const handleLoginFormSubmit = (event) => {
        event.preventDefault()

        dispatch(login(username, password)) // error handling left showing notification
    }

    const loginForm = () => (
        <LoginForm handleLoginFormSubmit = {handleLoginFormSubmit} username = {username} setUserName  = {setUserName} password = {password} setPassword = {setPassword} />
    )

    console.log(useSelector(state => state.login))
    console.log(window.localStorage)

    return (
        <div>
            <Notification />
            {
                user === null
                    ? loginForm():
                    <Blogs />
            }
        </div>
    )
}

export default App