import React, { Component } from 'react';
import classes from './NewPetBlog.module.scss';
import RichTextEditor from '../../../components/RichTextEditor/RichTextEditor';
import axios from '../../../axios';
import Loader from '../../../components/UI/Spinner/Spinner';
import { Redirect, NavLink } from 'react-router-dom';
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
        loading: false,
        loadingText: ''
    }

    componentDidMount() {
        window.scrollTo(0,0);
    }
    
    fileSelectedHandler = event => {
        var options = {
            maxSizeMB: 1,
        }
        
        imageCompression(event.target.files[0] , options)
        .then(response => {
            this.setState({
                selectedFile: response,
                loading: false,
                loadingText: ''
            });
        });
    }
    
    // handleDelete = (i) => {
    //     const tags = this.state.tags.slice(0)
    //     tags.splice(i, 1)
    //     this.setState({ tags })
    //   }
     
    // handleAddition = (tag) => {
    // console.log('tag' ,tag);
    // const tags = [].concat(this.state.tags, tag)
    // this.setState({ tags })
    // }

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
            'cookie': 0
        }
        formData.append('image', this.state.selectedFile);
        formData.append('data', JSON.stringify(data));

        if(this.state.title === '' || this.state.shortDesc === '' || event === '' || this.state.selectedFile === null ) {
            toast.error('Please fill all the details');
        } else {
            this.setState({
                loading: true,
                loadingText: 'Hang On! Publishing Blog!'
            });

            axios.post('/api/v1/blogs' , formData ,  { headers: {"Authorization" : this.props.accessToken}}).then(res => {
                this.setState({
                    postedData: res.data.data,
                    loading: false,
                    title: '',
                    description: '',
                    shortDesc: '',
                    selectedFile: null,
                    loadingText: ''
                })
                    this.props.history.push('/blogs');
            }).catch(error => {
                toast.error('There is some error posting Blog ' + error);
                // this.props.history.push('/auth');
            });
        }
    })

    render() {
        let uploadFileText = null;
        let redirect = null;
        if(this.state.selectedFile) {
            uploadFileText = (<span style={{display: 'block', color:'rgba(223,204,153, 1)', fontSize: '16px', marginTop:'10px'}}>Uploaded Image: {this.state.selectedFile.name} </span>)
        }
        let form;

        if(this.state.loading) {
            form = (
                        
                <div style={{ height:'100vh', position: 'absolute', top:'-70px', left:'40%', paddingTop: '100px'}}>
                    <Loader />
                    <p style={{fontSize: '30px' , textAlign: 'center'}}>{this.state.loadingText}</p>
                </div>            
        )

        } else if (this.state.postedData && !this.state.loading) {
            redirect = <Redirect to="/blogs" />
        } else {
            form = (
                // <Aux>
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

                                <RichTextEditor sendDataToParent={this.handleSubmit}/>
                            </div>
                            

                        </div>
                    </div>
                </div>
                

                // {/* <div className={classes.Typeahead}> */}

                
                // {/* </div> */}
                // </Aux>
            )
        }
        return(
            
            <div>
                {redirect}
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

export default NewPetBlog;


