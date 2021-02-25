import React, {useState, useImperativeHandle} from 'react'

const Toggelable = React.forwardRef((props, ref) => {
    
    const [visible, setVisible] = useState(false)
    const showWhenVisible = {
        display: visible ? '' : 'none'
    }

    const hideWhenVisible = {
        display: visible ? 'none': ''
    }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style = {hideWhenVisible}>
                <button onClick = {toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style = {showWhenVisible}>
                {props.children}
                <button onClick = {toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

export default Toggelable