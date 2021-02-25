import React from 'react'

const Notification = ({ successMessage, errorMessage }) => {
    const errorStyle = {
        color: 'red',
        backgroundColor: 'lightgrey'
    }

    const successStyle = {
        color: 'green',
        backgroundColor: 'lightgrey'

    }

    if (successMessage === null && errorMessage === null) {
        return null
    }

    if (errorMessage !== null) {
        return (
            <div style={errorStyle}>
                <h2>{errorMessage}</h2>
            </div>
        )
    }

    if (successMessage !== null) {
        return (
            <div style = {successStyle}>
                <h2>a new blog {successMessage} added</h2>
            </div>
        )
    }
}

export default Notification