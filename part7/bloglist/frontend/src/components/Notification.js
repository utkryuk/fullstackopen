import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {

    const notification = useSelector(state => state.notification)

    if (notification === null) {
        return null
    }
    else {
        const notifMessage = notification.notification
        if (notification.success) {
            return (
                <div>
                    <Alert severity = 'success'>{notifMessage}</Alert>
                </div>
            )
        }
        else {
            return (
                <Alert severity = 'error'>{notifMessage}</Alert>
            )
        }
    }

}

export default Notification