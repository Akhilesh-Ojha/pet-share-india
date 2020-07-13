import React , { Component } from "react";
import classes from './PutUpForAdoption.module.scss';
import { NavLink } from 'react-router-dom';
// import axios from '../../axios';
import SemanticInput from '../../components/UI/SemanticInput/SemanticInput';
// import { Image } from 'semantic-ui-react'
// import Input from '../../components/UI/Input/Input';
import { Form , Button , Segment , Header } from 'semantic-ui-react';

// const options = [
//   { key: 'm', text: 'Male', value: 'male' },
//   { key: 'f', text: 'Female', value: 'female' }
// ]


class PutUpForAdoption extends Component {

    state = {
        form: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter your name',
                    semanticlabel: 'Name',
                    maxLength: 20,
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 20
                },
                valid: false,
                validationMessage: '',
                touched: false
            },
            petType: {
                elementType: 'select',
                elementConfig: {
                    label: 'Pet Type',
                    placeholder: 'Please select a pet type',
                    options: [
                        {value: '', text: 'Please select a pet type'}, 
                        {value: 'cat', text: 'Cat'},
                        {value: 'dog', text: 'Dog'}
                    ]
                },
                value: '',
                validation: {
                    required: true,
                },
                validationMessage: '',
                valid: false,
                touched: false
            },

            breed: {
                elementType: 'select',
                elementConfig: {
                    label: 'Breed',
                    placeholder: 'Please select your pet breed',
                    options: [
                        {value: '', text: 'Please select your pet breed'}
                    ]
                },
                value: '',
                validation: {
                    required: true,
                },
                validationMessage: '',
                valid: false,
                touched: false

            },

            gender: {
                elementType: 'select',
                elementConfig: {
                    label: 'Gender',
                    placeholder: 'Please select gender',
                    options: [
                        {value: '', text: 'Please select gender'},
                        { key: 'm', text: 'Male', value: 'male' },
                        { key: 'f', text: 'Female', value: 'female' }
                    ]
                },
                value: '',
                validation: {
                    required: true,
                },
                validationMessage: '',
                valid: false,
                touched: false
            },

            dewormed: {
                elementType: 'select',
                elementConfig: {
                    placeholder: 'Dewormed',
                    label: 'Dewormed',
                    options: [
                        {value: '', text: 'Dewormed Status'},
                        {value: 'yes', text: 'Yes'},
                        {value: 'no', text: 'No'}
                    ]
                },
                value: '',
                validation: {
                    required: true,
                },
                validationMessage: '',
                valid: false,
                touched: false

            },

            description: {
                elementType: 'textarea',
                elementConfig: {
                    placeholder: 'Let us know more about you pet',
                    label: 'Pet Description',
                    
                },
                value: '',
                validation: {
                    required: true,
                },
                validationMessage: '',
                valid: false,
                touched: false

            },
        },
        formIsValid: false
    }

    
    checkValidity(value, rules) {
        let isValid = true;
        let errorMessage = ''
        if(rules.required) {

            isValid = value !== '' && isValid;

            if(isValid === false) {
                errorMessage = 'Required Fields are Missing'
            }
        }

        if(rules.minLenght) {
            isValid = value.length >= rules.minLenght && isValid;

            if(isValid === false) {
                errorMessage = 'Password should have a minimum lenght of 6'
            }
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        
        return {
            isValid: isValid,
            errorMessage: errorMessage,
        };;
    }


    handleChange = (event,inputIdentifier) => {
        event.preventDefault();
        const updatedForm = {
            ...this.state.form
        }
        if(inputIdentifier === 'petType') {
            if(event.target.value === 'cat') {
                updatedForm.breed.elementConfig.options = [
                    {value: '', text: 'Breed'},
                    {value: 'abyssinian', text: 'Abyssinian'},
                    {value: 'americanShorthair', text: 'American Shorthair'},
                    {value: 'bengal', text: 'Bengal'},
                    {value: 'birman', text: 'Birman'},
                    {value: 'himalayan', text: 'Himalayan'},
                    {value: 'maineCoon', text: 'Maine Coon'},
                    {value: 'orientalShorthair', text: 'Oriental Shorthair'},
                    {value: 'persians', text: 'Persians'},
                    {value: 'ragdoll', text: 'Ragdoll'},
                    {value: 'sphynx', text: 'Sphynx'},
                    {value: 'siamese', text: 'Siamese'},
                    {value: 'others', text: 'Others'},
                ]
            } else if (event.target.value === 'dog') {
                updatedForm.breed.elementConfig.options = [
                    {value: '', text: 'Breed'},
                    {value: 'beagle', text: 'Beagle'},
                    {value: 'boxer', text: 'Boxer'},
                    {value: 'bulldog', text: 'Bulldog'},
                    {value: 'chihuahua', text: 'Chihuahua'},
                    {value: 'collie', text: 'Collie'},
                    {value: 'corgi', text: 'Corgi'},
                    {value: 'dachshund', text: 'Dachshund'},
                    {value: 'dalmatian', text: 'Dalmatian'},
                    {value: 'doberman', text: 'Doberman'},
                    {value: 'germanshepherd', text: 'German Shepherd'},
                    {value: 'dane', text: 'Great Dane'},
                    {value: 'husky', text: 'Husky'},
                    {value: 'labrador', text: 'Labrador'},
                    {value: 'pitbull', text: 'Pitbull'},
                    {value: 'pomeranian', text: 'Pomeranian'},
                    {value: 'pug', text: 'Pug'},
                    {value: 'retriever', text: 'Golden Retriever'},
                    {value: 'rottweiler', text: 'Rottweiler'},
                    {value: 'shiba', text: 'Shiba'},
                    {value: 'shihtzu', text: 'Shihtzu'},
                    {value: 'others', text: 'Others'},
                ]
            }
        }
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        let validationValues = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.valid = validationValues.isValid;
        updatedFormElement.validationMessage = validationValues.errorMessage
        console.log(updatedFormElement);
        updatedFormElement.touched = true
        updatedForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for(let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid
        }

        this.setState({
            form: updatedForm,
            formIsValid: formIsValid
        })
    };


    render() {
        const formElementArray = [];
        for(let key in this.state.form) {
            formElementArray.push({
                id: key,
                config: this.state.form[key]
            })
        }

        return(
            <div className={classes.MainContainer}>
                <NavLink className={classes.Back} to={{pathname: '/'}}>
                    <i style={{fontSize: '35px', color: '#3E4041'}} className="fa fa-arrow-left" aria-hidden="true"></i>
                </NavLink>
                <div className={classes.Form}> 


                    <Segment inverted>
                    <Header size='huge'>CREATE YOUR PET PROFILE</Header>
                        <Form inverted success size={'large'}>
                            {formElementArray.map(formElement => (
                                <SemanticInput key={formElement.id} elementType={formElement.config.elementType} 
                                    elementConfig={formElement.config.elementConfig} 
                                    value={formElement.config.value} 
                                    invalid={!formElement.config.valid}
                                    touched={formElement.config.touched}
                                    valueType={formElement.config.elementConfig.placeholder}
                                    validationMessage={formElement.config.validationMessage}
                                    changed={(event) => this.handleChange(event, formElement.id)}/>
                            ))}
                        </Form>
                        <Button
                        style={{ marginBottom: '10px' , display: 'block'}}
                            content="Upload Image"
                            labelPosition="left"
                            icon="file"
                            onClick={() => this.inputFile.click()}
                        />
                        <input style={{display:'none' }} className={classes.Input} type="file" ref = {(inputFile)=> this.inputFile = inputFile} onChange={this.fileSelectedHandler} ></input>
                        <Button
                            content="Submit"
                            disabled={!this.state.formIsValid}
                            style={{margin: '10px 0' , display: 'block'}}
                        />
                    </Segment> 
                </div>
            </div>
        )
    }
}

export default PutUpForAdoption;


