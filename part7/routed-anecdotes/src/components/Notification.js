const Notification = ({ notification, setNotification }) => {

    if (notification === '') {
        return (
            <div>
            </div>

        )    
    }

    else {
        return (
            <div>
                {notification}
            </div>
        )    
    }
}

export default Notification