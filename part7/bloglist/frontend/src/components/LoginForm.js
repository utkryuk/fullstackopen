import React from 'react'
import PropTypes from 'prop-types'
import { Button, makeStyles, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const LoginForm = ({ handleLoginFormSubmit, username, setUserName, password, setPassword }) => {

    const classes = useStyles()

    return (
        <div>
            <form className = {classes.root} onSubmit={handleLoginFormSubmit}>
                <div>
                    <TextField value = {username} label = 'username' onChange = {({ target }) => (setUserName(target.value))} required />
                </div>
                <div>
                    <TextField type = 'password' value = {password} label = 'password' onChange = {({ target }) => (setPassword(target.value))} required />
                </div>
                <Button type = 'submit' variant = 'contained' color = 'primary'>LOGIN</Button>
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