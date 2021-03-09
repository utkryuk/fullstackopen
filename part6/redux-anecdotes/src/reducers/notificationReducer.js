export const setNotification = (notification, time) => {
    return async (dispatch) => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            data: notification
        })

        setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION'
            })
        }, time*1000)
    }
}

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return action.data
        case 'REMOVE_NOTIFICATION':
            return null
        default:
            return state
    }
}

export default notificationReducer