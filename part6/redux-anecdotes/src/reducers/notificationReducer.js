export const showNotification = (notification) => {
    return {
        type: 'SHOW_NOTIFICATION',
        data: {
            notification
        }
    }
}

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return action.data.notification
        default:
            return state
    }
}

export default notificationReducer