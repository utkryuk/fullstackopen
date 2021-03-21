let setTimeoutId = null

export const setNotification = (notification, time, isSuccess) => {
    return async (dispatch) => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            data: {
                notification,
                success: isSuccess
            }
        })

        clearTimeout(setTimeoutId)

        setTimeoutId = setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION'
            })
        }, time*1000)
    }
}

const notificationReducer = (state = null, action) => {
    switch(action.type) {
    case 'SHOW_NOTIFICATION':
        return action.data
    case 'REMOVE_NOTIFICATION':
        return null
    default:
        return state
    }
}

export default notificationReducer