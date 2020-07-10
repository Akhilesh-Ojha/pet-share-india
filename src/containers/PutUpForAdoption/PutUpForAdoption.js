import React , { Component } from "react";
import classes from './PutUpForAdoption.module.scss';
import { NavLink } from 'react-router-dom';
import { Form , Message, Input , Button , Segment , Header , Image} from 'semantic-ui-react';

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

class PutUpForAdoption extends Component {
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
                                    options={options}
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

                            
                            
                            {/* <Input type="file">
                            <Button
                                content="Choose File"
                                labelPosition="left"
                                icon="file"
                            />
                            </Input> */}
                            <Button
                                content="Upload Image"
                                labelPosition="left"
                                icon="file"
                                onClick={() => this.inputFile.click()}
                                style={{ marginBottom: '10px'}}
                            />
                            <input style={{display:'none' }} className={classes.Input} type="file" ref = {(inputFile)=> this.inputFile = inputFile} onChange={this.fileSelectedHandler} ></input>


                            <Form.TextArea label='Enter a short description' placeholder='Tell us more about your pet...' />

                            {/* <Message
                                success
                                header='Form Completed'
                                content="You're all signed up for the newsletter"
                            /> */}
                            <Form.Button>Submit</Form.Button>
                    </Form>
                </Segment>
                </div>
            </div>
        )
    }
}

export default PutUpForAdoption