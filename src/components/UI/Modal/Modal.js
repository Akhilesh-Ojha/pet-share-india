import React from 'react';
import classes from './Modal.module.scss';
import Aux from '../../../hoc/Auxx';
import BackDrop from '../BackDrop/BackDrop'

const modal = (props) => {
    return(
        <Aux>
            <div className={classes.Modal}>
                {props.children}
            </div>
        </Aux>
    )
}   

export default modal;