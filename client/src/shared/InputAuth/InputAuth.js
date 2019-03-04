import React from 'react'
import './InputAuth.css'
import {isInvalid} from '../validation/validation'
import TextField from '@material-ui/core/TextField'


const InputEmail = props => {
    const inputType = props.type || 'text'
    const htmlFor = `${inputType}-${Math.random()}`
    const cls = ['textField']

    if (isInvalid(props)) {
        cls.push('invalid')
    }

    return (
        <div>
            <TextField
                id={htmlFor}
                label={props.label}
                className={cls.join(' ')}
                style={{width: '100%', boxSizing: 'border-box'}}
                type={inputType}
                name={props.name}
                autoComplete={props.autoComplete}
                margin="normal"
                variant="outlined"
                value={props.value}
                onChange={props.onChange}
            />

            {
                isInvalid(props)
                ? <p className="invalid">{props.errorMessage || 'Введите верное значение'}</p>
                : null
            }
        </div>
    )
}

export default InputEmail