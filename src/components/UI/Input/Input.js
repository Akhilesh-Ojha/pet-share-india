import React from 'react';
import classes from './Input.module.scss';

const input = (props) => {

    let inputEl = null;
    switch (props.elementType) {
        case ('input'): 
            inputEl = <input className={classes.InputElement} 
                        {...props.elementConfig}
                        value={props.value}/>;
            break;

        case ('textare'):
            inputEl = <textarea className={classes.InputElement}  {...elementConfig} value={props.value}/>;
            break;

        default: 
            inputEl = <input className={classes.InputElement}  {...elementConfig} value={props.value}/>;
    }

    return(
        <div className={classes.Container}>
            {inputEl}
        </div>
    )
}

export default input;