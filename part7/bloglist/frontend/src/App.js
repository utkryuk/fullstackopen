import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { login, initialLogin } from './reducers/loginReducer'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useRouteMatch } from 'react-router-dom'


const App = () => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector(state => state.login)
    const users = useSelector(state => state.users)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initialLogin())
    }, [dispatch])

    const handleLoginFormSubmit = (event) => {
        event.preventDefault()

        dispatch(login(username, password)) // error handling left showing notification
    }

    const loginForm = () => (
        <LoginForm handleLoginFormSubmit = {handleLoginFormSubmit} username = {username} setUserName  = {setUserName} password = {password} setPassword = {setPassword} />
    )

    const matchedUserUrl = useRouteMatch('/users/:id')
    const matchedUser = matchedUserUrl
        ? users.find(user => user.id === matchedUserUrl.params.id)
        : null
    return (
        <div>
            <nav>
                <Link to = '/'>blogs</Link>
                <Link to = '/users'>users</Link>
            </nav>
            <Notification />

            <Switch>
                <Route exact path = '/'>
                    { user === null ? loginForm() : <Blogs />}      
                </Route>
                <Route exact path = '/users'>
                    <Users />
                </Route>
                <Route path = '/users/:id'>
                    <User user = {matchedUser}/>
                </Route>
            </Switch>
        </div>
    )
}

export default App