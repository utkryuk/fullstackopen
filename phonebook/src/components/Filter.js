import React from 'react'


const Filter = (props) => {
    return (
        <div>
        filter shown with<input value = {props.filterName} onChange = {props.filterNameChange} />
        </div>  
    )
}

export default Filter;