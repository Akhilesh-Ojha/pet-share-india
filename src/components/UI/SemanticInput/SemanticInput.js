import React from 'react';
import { TextArea , Label } from 'semantic-ui-react';
import classes from './SemanticInput.module.scss';
import Aux from '../../../hoc/Auxx';
const semanticInput = (props) => {
    let inputEl = null;

    const inputClasses = [classes.InputElement ];

    let validationError = null;

    if(props.invalid && props.touched) {
        inputClasses.push(classes.Invalid)
        
        validationError = <p className={classes.ValidationError}>{props.validationMessage}</p>;
    }

    switch (props.elementType) {
        case ('input'): 
            inputEl = (
                <Aux>
                    <Label className={classes.Label} style={{float:'left', fontSize: '16px', textAlign: 'center', margin: '0px auto', padding: '12px 0' ,height: '42px' , width: '100px'}}  for={props.elementConfig.placeholder}>{props.elementConfig.semanticlabel}</Label>
                    <span style={{ display: 'block', overflow: 'hidden', padding: '0 4px 0 6px'}}>
                            <input  id={props.elementConfig.placeholder} className={inputClasses.join(' ')}  {...props.elementConfig}
                            value={props.value} onChange={props.changed} />
                    </span>
                    
                </Aux>
            );
            break;

        case ('textarea'):
            inputEl = (
                <span style={{ display: 'block', overflow: 'hidden', padding: '0 4px 0 6px'}}><TextArea {...props.elementConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.changed}/>
                </span>);
            break;

        case ('select'): 
            inputEl = (
                <Aux>
                    <Label className={classes.Label} style={{float:'left', fontSize: '16px', textAlign: 'center', margin: '0px auto', padding: '12px 0' ,height: '42px' , width: '100px'}} for={props.elementConfig.placeholder}>{props.elementConfig.label}</Label>

                    <span style={{ display: 'block',
    overflow: 'hidden',
    padding: '0 4px 0 6px'}}>

                    <select className={inputClasses.join(' ')} 
                    id={props.elementConfig.placeholder}
                        value={props.value} onChange={props.changed} >
                            {props.elementConfig.options.map(option => (
                                <option value={option.value}>{option.text}</option>
                            ))}
                    </select>
    </span>
                </Aux>
            );
            break;

      

        default: 
            inputEl = <input  className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;

        }
        return(
            <div className={classes.Container}>
                {inputEl}
                {validationError}
            </div>
        )
}

export default semanticInput;