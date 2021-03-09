export const showNotification = (notification) => {
    return {
        type: 'SHOW_NOTIFICATION',
        data: {
            notification
        }
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }   
}

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return action.data.notification
        case 'REMOVE_NOTIFICATION':
            return null
        default:
            return state
    }
}

export default notificationReducer