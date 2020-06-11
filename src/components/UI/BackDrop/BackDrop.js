import React from 'react';
import classes from './BackDrop.module.scss';

const backDrop = (props) => {
    return(
        props.show ? <div onClick={props.clicked} className={classes.BackDrop}></div> : null
    )
}

export default backDrop;