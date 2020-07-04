import React from 'react';
import classes from './Input.module.scss';

const input = (props) => {
    let inputEl = null;
    const inputClasses = [classes.InputElement ];

    let validationError = null;

    if(props.invalid && props.touched) {
        inputClasses.push(classes.Invalid)
        
        validationError = <p className={classes.ValidationError}>{props.validationMessage}</p>;
    }
    switch (props.elementType) {
        case ('input'): 
            inputEl = <input className={inputClasses.join(' ')} 
                        {...props.elementConfig}
                        value={props.value} onChange={props.changed}/>;
            break;

        case ('textare'):
            inputEl = <textarea className={inputClasses.join(' ')}  {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;

        default: 
            inputEl = <input className={inputClasses.join(' ')}  {...props.elementConfig} value={props.value} onChange={props.changed}/>;
    }

    return(
        <div className={classes.Container}>
            {inputEl}
            {validationError}
        </div>
    )
}

export default input;