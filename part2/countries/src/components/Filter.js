import React from 'react'

const Filter = (props) => {
    return (
        <div>
        find countries <input value = {props.inputCountry} onChange = {props.handleCountryChange} />
        </div>
    )
}

export default Filter;