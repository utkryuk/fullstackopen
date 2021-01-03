import React from 'react'

const Notification = ({addMessage, addPerson, deleteMessage, deletePerson}) => {

    // console.log(message)

    if (addMessage === null && deleteMessage === null){
        return null
    }

    if (addMessage !== null){
        return (
            <div className = {addPerson}>{addMessage}</div>
        )
    }

    if (deleteMessage !== null){
        return (
            <div className = {deletePerson}>{deleteMessage}</div>
        )
    }
}

export default Notification;