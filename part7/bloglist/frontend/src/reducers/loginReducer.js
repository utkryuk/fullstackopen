import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

export const initialLogin = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            
            const userData = JSON.parse(loggedUserJSON)
            blogService.setToken(userData.token)

            dispatch({
                type: 'INIT_LOGIN',
                data: userData
            })
        }
    }
}
export const login = (username, password) => {
    return async dispatch => {

        try {
            const userData = await loginService.login({ username, password })
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(userData))
            dispatch({
                type: 'LOGIN',
                data: userData
            })
        }
        catch (error) {
            dispatch(setNotification('wrong username or password', 5, false))
        }
    }
}

export const logout = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedBlogAppUser')
        dispatch({
            type: 'LOGOUT'
        })
    }
}

const loginReducer = (state = null, action) => {
    switch(action.type) {
        case 'INIT_LOGIN':
            return action.data
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export default loginReducer