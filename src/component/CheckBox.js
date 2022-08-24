import React from 'react'
import PropTypes from 'prop-types'

const CheckBox = props => {
    
    const inputRef = React.useRef(null)

    const onChange = () => {
        if (props.onChange) {
            props.onChange(inputRef.current)
        }
    }

    return (
        <div style={{paddingLeft:"15px"}}>
            <label className="container"> {props.label}
                <input type="checkbox" ref={inputRef} onChange={onChange} checked={props.checked} />
                <span className="checkmark"></span>
            </label>

        </div>

    )
}

CheckBox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool
}

export default CheckBox