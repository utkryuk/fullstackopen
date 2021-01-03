import React from 'react'

const Notification = ({message}) => {

    // console.log(message)
    if (message === null){
        return null
    }

    return (
        <div className = "addPerson">
            {message}
        </div>
    )
}

export default Notification;