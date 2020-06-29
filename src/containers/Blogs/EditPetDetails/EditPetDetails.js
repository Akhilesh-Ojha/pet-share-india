import React, { Component } from 'react';
import classes from './EditPetDetails.module.scss';
import RichTextEditor from '../../../components/RichTextEditor/RichTextEditor';
import axios from '../../../axios';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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
        axios.get( '/api/v1/blogs/' +  this.props.match.params.id  ,  { headers: {"Authorization" : this.props.accessToken}} )
        .then(response => {
            let petDetails = response.data.data.Blog;
            this.setState({
                title: petDetails.title,
                description: petDetails.description,
                shortDesc: petDetails.shortDesc
            });
        }).catch(error => {
            toast.error('There is some error in editing Blog ' + error);
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
        if(this.state.selectedFile) {
            formData.append('image', this.state.selectedFile);
        }
        formData.append('data', JSON.stringify(data));
        this.setState({
            loading: true
        })
        axios.post('/api/v1/blogs' , formData , { headers: {"Authorization" : this.props.accessToken}}).then(res => {
            console.log('response from POST Request', res);
            this.setState({
                postedData: res.data.data,
                loading: false,
                title: '',
                description: '',
                shortDesc: '',
                selectedFile: null,
            })
            this.props.history.push('/blogs');
        }).catch(error => {
            toast.error('There is some error in editing Blog ' + error);
        });
    });

    render() {
        let uploadFileText = null;
        // let redirect = null;
        if(this.state.selectedFile) {
            uploadFileText = (<span style={{display: 'block', color: 'rgba(223,204,153, 1)'}}>Uploaded Image: {this.state.selectedFile.name} </span>)
        }

        let form;
        if(this.state.loading) {
            form = (
                <div style={{ height:'100vh'}}>
                    <Loader />
                    <p style={{fontSize: '30px' , textAlign: 'center'}}>Hang On! Publishing Blog!</p>
                </div>
            )
        } else {
            form = (

                <div className={classes.Bg}>
                <div className={classes.Wrapper}>
                        <NavLink style={{textDecoration: 'none' , color: 'rgba(223,204,153, 1)'} } to={{pathname: '/blogs'}}>
                            <i style={{fontSize: '30px'}} className="fa fa-arrow-left" aria-hidden="true"></i>
                        </NavLink>

                    <div className={classes.ContactForm}>
                            
                            <div className={classes.InputFields}>
                                <input className={classes.Change} type="text" maxLength="60" onChange={this.inputTitleHandler} value={this.state.title}  placeholder="Title"/>

                                <input className={classes.Change} type="text" maxLength="250" onChange={this.inputDescHandler} value={this.state.shortDesc}  placeholder="Enter a Short Description"/>

                                <input style={{display: 'none'}} type="file" onChange={this.fileSelectedHandler} ref={fileInput => this.fileInput = fileInput}></input>
                                <button className={classes.InputButton} onClick={() => this.fileInput.click()}>Upload Image</button>
                                {uploadFileText}
                                

                            </div>
                            
                            <div className={classes.Msg}>

                                <RichTextEditor sendDataToParent={this.handleSubmit} description={this.state.description} title={this.state.title} shortDesc={this.state.shortDesc}/>
                            </div>
                            

                    </div>
                    
                </div>
                </div>
            )
        }
        return(
            
            <div>
                {form}
                <ToastContainer position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
            
        )
    }
}

export default EditPetDetails;

