import React, { Component } from 'react';
import classes from './NewPetBlog.module.scss';
// import RichTextEditor from '../../../components/RichTextEditor/RichTextEditor';
import QuillEditor from '../../../components/RichTextEditor/QuillEditor';
import axios from '../../../axios';
import { NavLink } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class NewPetBlog extends Component {

    state = {
        title: '',
        description: '',
        shortDesc: '',
        selectedFile: null,
        postedData: null,
        
    }

    componentDidMount() {
        window.scrollTo(0,0);
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
        this.setState({
            description: event
        })
    }

    // onFilesChange = event => {
    //     console.log('FILE EVENT', event);
    // }

    handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        let data = {
            'title': this.state.title,
            'description': this.state.description,
            'shortDesc': this.state.shortDesc,
            'cookie': 0
        }
        formData.append('image', this.state.selectedFile);
        formData.append('data', JSON.stringify(data));

        if(this.state.title === '' || this.state.shortDesc === '' || this.state.description === '' || this.state.selectedFile === null ) {
            toast.error('Please fill all the details');
        } else {
            toast.info('Hang On! Uploading Blog...');
            axios.post('/api/v1/blogs' , formData ,  { headers: {"Authorization" : this.props.accessToken}}).then(res => {
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
                toast.error('There is some error posting Blog ' + error);
            });
        }
    };

    render() {
        let uploadFileText = null;

        if(this.state.selectedFile) {
            uploadFileText = (<span style={{display: 'block', color: 'black', fontSize: '16px', marginTop:'10px'}}>UPLOADED IMAGE: {this.state.selectedFile.name} </span>)
        }
        let form = (
                <div className={classes.Bg}>
                    <div className={classes.Wrapper}>
                        <NavLink style={{textDecoration: 'none' , color: 'rgba(223,204,153, 1)'} } to={{pathname: '/blogs'}}>
                            <i style={{fontSize: '30px', marginTop: '100px'}} className="fa fa-arrow-left" aria-hidden="true"></i>
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
                                <QuillEditor placeholder={"Post you Blog"}
                                onEditorChange={this.onEditorChange}
                                // onFilesChange={this.onFilesChange}
                                />

                                <button className={classes.SubmitButton} onClick={(e) => this.handleSubmit(e)}>Publish</button>
                                {/* <RichTextEditor sendDataToParent={this.handleSubmit}/> */}
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

export default NewPetBlog;


