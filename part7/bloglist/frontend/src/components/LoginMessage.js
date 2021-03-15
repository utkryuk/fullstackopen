import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const LoginMessage = () => {

    const user = useSelector(state => state.login)

    const dispatch = useDispatch()

    const handleLogOutButton = (event) => {
        event.preventDefault()
        dispatch(logout())
    }

    if (!user) {
        return null
    }
    
    return (
        <div>
            <p>{user.name} logged in<button onClick = {handleLogOutButton} className = 'logout-btn'>logout</button></p>
        </div>
    )
}

export default LoginMessage