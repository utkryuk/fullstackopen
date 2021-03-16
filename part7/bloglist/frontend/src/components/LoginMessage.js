import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const LoginMessage = () => {

    const user = useSelector(state => state.login)

    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogOutButton = (event) => {
        event.preventDefault()
        dispatch(logout())
        history.push('/')
    }

    return (
        <span>
            {
                user !== null ?
                <div>
                    <Button color ='inherit' onClick = {handleLogOutButton}>Logout</Button>
                    <em>{user.name} logged in</em>
                </div>
                : <Button color = 'inherit' component = {Link} to = '/'>Login</Button>
            }
        </span>
    )
}

export default LoginMessage