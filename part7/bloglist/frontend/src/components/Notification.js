import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    
    const errorStyle = {
        color: 'red',
        backgroundColor: 'lightgrey'
    }

    const successStyle = {
        color: 'green',
        backgroundColor: 'lightgtrey'
    }

    const notification = useSelector(state => state.notification)

    if (notification === null) {
        return null
    }
    else {
        console.log(notification)
        const notifMessage = notification.notification
        if (notification.success) {
            return (
                <div style = {successStyle} className = 'success-class'>
                    <h2>{notifMessage}</h2>
                </div>
            )
        }
        else {
            return (
                <div style = {errorStyle} className = 'error-class'>
                    <h2>{notifMessage}</h2>
                </div>
            )
        }
    }

}

export default Notification