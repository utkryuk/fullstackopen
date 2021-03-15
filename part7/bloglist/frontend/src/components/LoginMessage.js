import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'

const LoginMessage = () => {

    const user = useSelector(state => state.login)

    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogOutButton = (event) => {
        event.preventDefault()
        dispatch(logout())
        history.push('/')
    }

    if (!user) {
        return null
    }
    
    return (
        <span>
            {user.name} logged in<button onClick = {handleLogOutButton} className = 'logout-btn'>logout</button>
        </span>
    )
}

export default LoginMessage