import React , { Component } from "react";
import classes from './PutUpForAdoption.module.scss';
import { NavLink } from 'react-router-dom';
import axios from '../../axios';
import { Form , Button , Segment , Header } from 'semantic-ui-react';

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' }
]

const pet_type = [];
const pet_Breed = [];

const element = {}
const breedElements = {}

class PutUpForAdoption extends Component {

    componentDidMount() {
        axios.get('/api/v1/pets/type' , { headers: {"Authorization" : this.props.accessToken }}).then(res => {
            let petTypeObject = res.data.data;
            
            Object.keys(petTypeObject).forEach(singlePet => {
                let updatedEl = {...element}
                updatedEl.text = singlePet;
                updatedEl.key = singlePet;
                updatedEl.value = singlePet
                pet_type.push(updatedEl);
            });

            Object.keys(petTypeObject).map(petTypeKey => {

                let updatedEl = {...breedElements}
                updatedEl.text = petTypeObject[petTypeKey];
                updatedEl.key = petTypeObject[petTypeKey];
                updatedEl.value = petTypeKey[petTypeObject]
                pet_Breed.push(updatedEl)
            })
            console.log('PET Breed', pet_Breed);
        })
    }

    render() {
        return(
            <div className={classes.MainContainer}>
                <div className={classes.Form}> 
                <NavLink style={{textDecoration: 'none' , color: 'black'} } to={{pathname: '/'}}>
                    <i style={{fontSize: '30px'}} className="fa fa-arrow-left" aria-hidden="true"></i>
                </NavLink>
                 <Header size='huge'>Create Your Pet Profile</Header>
                <Segment inverted>
                    <Form inverted success size={'large'}>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Name' placeholder='Name' />
                                <Form.Select
                                    fluid
                                    label='Pet Type'
                                    options={pet_type}
                                    placeholder='Pet Type'
                                />

                                <Form.Select
                                    fluid
                                    label='Breed'
                                    options={options}
                                    placeholder='Breed'
                                />
                                <Form.Select
                                    fluid
                                    label='Gender'
                                    options={options}
                                    placeholder='Gender'
                                />
                                <Form.Input label='Age' fluid placeholder='Age' />
                            </Form.Group>
                            <Form.Group inline>
                                <label>Dewormed</label>
                                <Form.Radio
                                    label='Yes'
                                    value='yes'
                                />
                                <Form.Radio
                                    label='No'
                                    value='no'
                                />
                                <label>Vaccine Status</label>
                                <Form.Radio
                                    label='Yes'
                                    value='yes'
                                />
                                <Form.Radio
                                    label='No'
                                    value='no'
                                />

                            </Form.Group>
                            <Button
                                content="Upload Image"
                                labelPosition="left"
                                icon="file"
                                onClick={() => this.inputFile.click()}
                                style={{ marginBottom: '10px'}}
                            />
                            <input style={{display:'none' }} className={classes.Input} type="file" ref = {(inputFile)=> this.inputFile = inputFile} onChange={this.fileSelectedHandler} ></input>


                            <Form.TextArea label='Enter a short description' placeholder='Tell us more about your pet...' />
                            
                            <Form.Button>Submit</Form.Button>
                    </Form>
                </Segment>
                </div>
            </div>
        )
    }
}

export default PutUpForAdoption