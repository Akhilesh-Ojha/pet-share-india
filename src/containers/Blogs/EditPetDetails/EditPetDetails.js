import React, { Component } from 'react';
import classes from './EditPetDetails.module.scss';
import RichTextEditor from '../../../components/RichTextEditor/RichTextEditor';
import axios from '../../../axios';
import Loader from '../../../components/UI/Spinner/Spinner';
// import { Redirect } from 'react-router-dom';
class EditPetDetails extends Component {

    state = {
        title: '',
        description: '',
        shortDesc: '',
        selectedFile: null,
        postedData: null,
        loading: false
    }

    componentDidMount() {
        window.scrollTo(0,0);
        this.getPetDetailsData();
    }

    getPetDetailsData() {
        let userToken = sessionStorage.getItem('accessToken');
        axios.get( '/api/v1/blogs/' +  this.props.match.params.id  ,  { headers: {"Authorization" : userToken} } )
        .then(response => {
            let petDetails = response.data.data.Blog;
            console.log('petDeetails', petDetails);
            this.setState({
                title: petDetails.title,
                description: petDetails.description,
                shortDesc: petDetails.shortDesc
            });
            console.log('updatedState', this.state);

        })
    }
    
    fileSelectedHandler = event => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    inputTitleHandler = event => {
        this.setState({
            title: event.target.value
        });
    }

    inputDescHandler = event => {
        this.setState({
            shortDesc: event.target.value
        })
    }

    

    handleSubmit = ((event) => {
        let formData = new FormData();
        let data = {
            'title': this.state.title,
            'description': event,
            'shortDesc': this.state.shortDesc,
            'id': this.props.match.params.id
        }
        console.log('data', data);
        let userToken = sessionStorage.getItem('accessToken');
        if(this.state.selectedFile) {
            formData.append('image', this.state.selectedFile);
        }
        formData.append('data', JSON.stringify(data));
        this.setState({
            loading: true
        })
        axios.post('/api/v1/blogs' , formData ,  { headers: {"Authorization" : userToken}}).then(res => {
            console.log('response from POST Request', res);
            this.setState({
                postedData: res.data.data,
                loading: false,
                title: '',
                description: '',
                shortDesc: '',
                selectedFile: null,
            })
            // return <Redirect to='/'/>
            this.props.history.push('/');
        });
    });

    render() {
        let uploadFileText = null;
        // let redirect = null;
        if(this.state.selectedFile) {
            uploadFileText = (<span style={{display: 'block'}}>Uploaded Image: {this.state.selectedFile.name} </span>)
        }

        let form;
        if(this.state.loading) {
            form = (
                <div style={{ height:'100vh' , paddingTop: '100px'}}>
                    <Loader />
                    <p style={{fontSize: '30px' , textAlign: 'center'}}>Hang On! Publishing Blog!</p>
                </div>
            )
        } else {
            form = (
                <div className={classes.Container}>
                    <div className={classes.FormContainer}>
                        {/* <h1>Add Your Blog</h1> */}
                        <div className={classes.Form}>
                            <input className={classes.Title} type="text" maxLength="60" onChange={this.inputTitleHandler} value={this.state.title}  placeholder="Title"/>


                            <input style={{display: 'none'}} type="file" onChange={this.fileSelectedHandler} ref={fileInput => this.fileInput = fileInput}></input>

                            {/* <div className={classes.Button}> */}
                            <button className={classes.UploadButton} onClick={() => this.fileInput.click()}>Upload Image</button>
                            {uploadFileText}
                            {/* </div> */}
                            <input className={classes.ShortDesc} type="text" maxLength="250" onChange={this.inputDescHandler} value={this.state.shortDesc}  placeholder="Enter a Short Description"/>
                        </div>
                        <RichTextEditor sendDataToParent={this.handleSubmit} description={this.state.description} title={this.state.title} shortDesc={this.state.shortDesc} />
                    </div>
                </div>
            )
        }
        return(
            
            <div>
                {/* {redirect} */}
                {form}
            </div>
            
        )
    }
}

export default EditPetDetails;


// else if (this.state.postedData && !this.state.loading) {
//     console.log('Hereeeeee, redirext please');
//     redirect = <Redirect to="/" />
// } 

