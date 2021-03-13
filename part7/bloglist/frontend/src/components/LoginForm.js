import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLoginFormSubmit, username, setUserName, password, setPassword }) => {
    return (
        <div>
            <form onSubmit={handleLoginFormSubmit}>
                <div>
                username
                    <input type = 'text' id = 'username' value = {username} onChange = {({ target }) => (setUserName(target.value))}/>
                </div>
                <div>
                password
                    <input type = 'password' id = 'password' value = {password} onChange = {({ target }) => (setPassword(target.value))} />
                </div>
                <div>
                    <button id = 'login-button' type = 'submit'>login</button>
                </div>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleLoginFormSubmit: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUserName: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired
}

export default LoginForm