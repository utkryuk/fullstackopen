import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { login, initialLogin } from './reducers/loginReducer'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'


const App = () => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector(state => state.login)

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

    return (
        <div>
            <Router>
                <nav>
                    <Link to = '/'>blogs</Link>
                    <Link to = '/users'>users</Link>
                </nav>
                <Notification />

                <Switch>
                    <Route exact path = '/'>
                        { user === null ? loginForm() : <Blogs />}      
                    </Route>
                    <Route path = '/users'>
                        <Users />
                    </Route>
                </Switch>
            </Router>
            {/* {
                user === null
                    ? loginForm():
                    <Blogs />
            } */}
        </div>
    )
}

export default App