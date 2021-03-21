import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

const Toggelable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)
    const showWhenVisible = {
        display: visible ? 'inline' : 'none',
        paddingBottom: '2%'
    }

    const hideWhenVisible = {
        display: visible ? 'none': '',
        padding: '2% 0%'
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
                <Button variant = 'contained' onClick = {toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style = {showWhenVisible}>
                {props.children}
                <Button variant= 'contained' color= 'secondary' onClick = {toggleVisibility}>CANCEL</Button>
            </div>
        </div>
    )
})

Toggelable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

Toggelable.displayName = 'Toggelable'

export default Toggelable