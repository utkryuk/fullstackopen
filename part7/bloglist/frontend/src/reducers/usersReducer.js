import userService from '../services/users'

export const getAllUsers = () => {

    return async dispatch => {
        const users = await userService.getAllUsers()
        dispatch({
            type: 'INIT_USERS',
            data: users
        })
    }
}

const usersReducer = (state = [], action) => {
    switch(action.type) {
    case 'INIT_USERS':
        return action.data
    default:
        return state
    }
}

export default usersReducer