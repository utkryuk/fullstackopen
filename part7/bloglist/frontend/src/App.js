import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import { useDispatch, useSelector } from 'react-redux'
import { login, initialLogin } from './reducers/loginReducer'
import { initialBlogs } from './reducers/blogsReducer'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import LoginMessage from './components/LoginMessage'
import { Container, AppBar, Toolbar, Button } from '@material-ui/core'

const App = () => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector(state => state.login)
    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blogs)
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initialLogin())
    }, [dispatch])

    useEffect(() => {
        dispatch(initialBlogs())
    }, [dispatch])
    
    const handleLoginFormSubmit = (event) => {
        event.preventDefault()

        dispatch(login(username, password))
    }

    const loginForm = () => (
        <LoginForm handleLoginFormSubmit = {handleLoginFormSubmit} username = {username} setUserName  = {setUserName} password = {password} setPassword = {setPassword} />
    )

    const matchedUserUrl = useRouteMatch('/users/:id')
    const matchedUser = matchedUserUrl
        ? users.find(user => user.id === matchedUserUrl.params.id)
        : null

    const matchedBlogUrl = useRouteMatch('/blogs/:id')
    const matchedBlog = matchedBlogUrl
        ? blogs.find(blog => blog.id === matchedBlogUrl.params.id)
        : null
    

    return (
        <Container>
            <AppBar position = 'static'>
                <Toolbar>
                    <Button color = 'inherit' component = {Link} to ='/'>
                        Blogs
                    </Button>
                    <Button color = 'inherit' component = {Link} to = '/users'>
                        Users
                    </Button>
                    <LoginMessage />
                </Toolbar>
            </AppBar>
                <Notification />

                <Switch>
                    <Route exact path = '/'>
                        { user === null ? loginForm() : <Blogs />}      
                    </Route>
                    <Route path = '/blogs/:id'>
                        <Blog blog = {matchedBlog} />
                    </Route>
                    <Route exact path = '/users'>
                        <Users />
                    </Route>
                    <Route path = '/users/:id'>
                        <User user = {matchedUser}/>
                    </Route>
                </Switch>
        </Container>
    )
}

export default App