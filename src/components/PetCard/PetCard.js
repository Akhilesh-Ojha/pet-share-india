import React from 'react';
import classes from './PetCard.module.scss';

const petCard = (props) => {
    return(
        
            <div className={classes.Box}>
                <img src={props.image} className={classes.image} alt="display"></img>
                <h2 className={classes.title}>{props.title}</h2>
                <p className={classes.desc}>{props.shortDesc}</p>
            </div>
    );
}
export default petCard
