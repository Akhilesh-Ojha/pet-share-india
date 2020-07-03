import React, { Component } from 'react';
import classes from './EditPetDetails.module.scss';
// import RichTextEditor from '../../../components/RichTextEditor/RichTextEditor';
import axios from '../../../axios';
import QuillEditor from '../../../components/RichTextEditor/QuillEditor';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';

class EditPetDetails extends Component {

    state = {
        title: '',
        description: '',
        shortDesc: '',
        selectedFile: null,
        postedData: null
    }

    componentDidMount() {
        window.scrollTo(0,0);
        this.getPetDetailsData();
    }

    getPetDetailsData() {
        axios.get( '/api/v1/blogs/' +  this.props.match.params.id  ,  { headers: {"Authorization" : this.props.accessToken}} )
        .then(response => {
            console.log('Description', response.data.data.Blog);
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
        var options = {
            maxSizeMB: 1,
        }
        toast.info('Uploading Image...');
        imageCompression(event.target.files[0] , options)
        .then(response => {
            toast.dismiss();
            this.setState({
                selectedFile: response,
                loading: false,
                loadingText: ''
            });
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

    onEditorChange = event => {
        console.log('EVE',event);
        this.setState({
            description: event
        })
    }
    

    handleSubmit = (event) => {
        let formData = new FormData();
        let data = {
            'title': this.state.title,
            'description': this.state.description,
            'shortDesc': this.state.shortDesc,
            'id': this.props.match.params.id
        }
        if(this.state.selectedFile) {
            formData.append('image', this.state.selectedFile);
        }
        formData.append('data', JSON.stringify(data));
        
        toast.info('Hang On! Editing Your Blog...');
        axios.post('/api/v1/blogs' , formData , { headers: {"Authorization" : this.props.accessToken}}).then(res => {
            toast.dismiss();
            this.setState({
                postedData: res.data.data,
                title: '',
                description: '',
                shortDesc: '',
                selectedFile: null,
            })
            this.props.history.push('/blogs');
        }).catch(error => {
            toast.dismiss();
            toast.error('There is some error in editing Blog ' + error);
        });
    };

    render() {
        let uploadFileText = null;
        if(this.state.selectedFile) {
            uploadFileText = (<span style={{display: 'block', color: 'rgba(223,204,153, 1)'}}>Uploaded Image: {this.state.selectedFile.name} </span>)
        }

        let form = (
                <div className={classes.Bg}>
                    <div className={classes.Wrapper}>
                            <NavLink style={{textDecoration: 'none' , color: 'rgba(223,204,153, 1)'} } to={{pathname: '/blogs'}}>
                                <i style={{fontSize: '30px' , marginTop: '100px'}} className="fa fa-arrow-left" aria-hidden="true"></i>
                            </NavLink>
                        <div className={classes.ContactForm}>
                                <div className={classes.InputFields}>
                                    <input className={classes.Change} type="text" maxLength="60" onChange={this.inputTitleHandler} value={this.state.title}  placeholder="Title"/>

                                    <input className={classes.Change} type="text" maxLength="250" onChange={this.inputDescHandler} value={this.state.shortDesc}  placeholder="Enter a Short Description"/>

                                    <input style={{display: 'none'}} type="file" onChange={this.fileSelectedHandler} ref={fileInput => this.fileInput = fileInput}></input>
                                    <button className={classes.InputButton} onClick={() => this.fileInput.click()}>Change Image</button>
                                    {uploadFileText}
                                </div>
                                <div className={classes.Msg}>

                                    <QuillEditor placeholder={"Post you Blog"}
                                        onEditorChange={this.onEditorChange}
                                        description={this.state.description}
                                        title={this.state.title} shortDesc={this.state.shortDesc}
                                        // onFilesChange={this.onFilesChange}   
                                    />

                                    <button className={classes.SubmitButton} onClick={(e) => this.handleSubmit(e)}>Edit Blog</button>
                                </div>
                        </div>
                    </div>
                </div>
            )
        
        return(
            
            <div>
                {form}
                <ToastContainer 
                    position="bottom-right"
                    autoClose={false}
                    hideProgressBar={false}
                    newestOnTop={false}
                    rtl={false}
                    draggable
                />
            </div>
            
        )
    }
}

export default EditPetDetails;

