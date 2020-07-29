import React, { Component } from 'react';
import classes from './NewPetBlog.module.scss';
// import RichTextEditor from '../../../components/RichTextEditor/RichTextEditor';
import QuillEditor from '../../../components/RichTextEditor/QuillEditor';
import axios from '../../../axios';
import { NavLink } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import faker from 'faker';
// import _ from 'lodash';
import { Dropdown } from 'semantic-ui-react'

// const addressDefinitions = faker.definitions.address
const tagOptions = [{
  key: 'key1',
  text: 'Tag1',
  value: 'tag1',
} , 
{
    key: 'key2',
    text: 'Tag2',
    value: 'tag2',
  } , {
    key: 'key3',
    text: 'Tag3',
    value: 'tag3',
  } , 
  {
    key: 'key4',
    text: 'Tag4',
    value: 'tag4',
  } , 
  {
      key: 'key5',
      text: 'Tag5',
      value: 'tag5',
    } , {
      key: 'key6',
      text: 'Tag6',
      value: 'tag6',
    } , 
    {
        key: 'key7',
        text: 'Tag7',
        value: 'tag7',
      } , 
      {
          key: 'key8',
          text: 'Tag8',
          value: 'tag8',
        } , {
          key: 'key9',
          text: 'Tag9',
          value: 'tag9',
        } , 
]



class NewPetBlog extends Component {

    state = {
        title: '',
        description: '',
        shortDesc: '',
        selectedFile: null,
        postedData: null,
        date: '',
        tags: [],
        
    }

    
    componentDidMount() {
        window.scrollTo(0,0);

        const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
        ];
        let today = new Date(),
            date = (monthNames[today.getMonth()] + ' '  + today.getDate()) 
            this.setState({
                date: date
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

    // tagHandler = event => {
    //     console.log('event', event.target.value);
    // }

    tagHandler = (e, result) => {
        const { name, value } = result;

        this.setState({
           [name]: value
        });
    }

    onEditorChange = event => {
        this.setState({
            description: event
        })
    }

    

    handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        let data = {
            'title': this.state.title,
            'description': this.state.description,
            'shortDesc': this.state.shortDesc,
            'cookie': 0,
            'date': this.state.date
        }
        formData.append('images', this.state.selectedFile);
        formData.append('data', JSON.stringify(data));


        if(this.state.title === '' || this.state.shortDesc === '' || this.state.description === '' || this.state.selectedFile === null ) {
            toast.error('Please fill all the details');
        } else {
            toast.info('Hang On! Publishing Blog...');
            
            axios.post('/api/v1/blogs' , formData ,  { headers: {"Authorization" : this.props.accessToken , "Content-type": "multipart/form-data"} }).then(res => {
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
                toast.error('There is some error posting Blog ' + error);
            });
        }
    };

    render() {
        let uploadFileText = null;

        if(this.state.selectedFile) {
            uploadFileText = (<span style={{display: 'block', color: '#2D3F47', fontSize: '16px', marginTop:'10px'}}>UPLOADED IMAGE: {this.state.selectedFile.name} </span>)
        }
        let form = (
                <div className={classes.Bg}>
                    <div className={classes.Wrapper}>
                        <NavLink style={{textDecoration: 'none' , color: '#f5f5f5'} } to={{pathname: '/blogs'}}>
                            <i style={{fontSize: '30px', marginTop: '100px'}} className="fa fa-arrow-left" aria-hidden="true"></i>
                        </NavLink>
                        <div className={classes.ContactForm}>
                            
                            <div className={classes.InputFields}>
                                <input className={classes.Change} type="text" maxLength="60" onChange={this.inputTitleHandler} value={this.state.title}  placeholder="Title"/>

                                <input className={classes.Change} type="text" maxLength="165" onChange={this.inputDescHandler} value={this.state.shortDesc}  placeholder="Enter a Short Description"/>

                                <input style={{display: 'none'}} type="file" onChange={this.fileSelectedHandler} ref={fileInput => this.fileInput = fileInput}></input>
                                <button className={classes.InputButton}  onClick={() => this.fileInput.click()}>Upload Image</button>
                                {uploadFileText}

                                <Dropdown
                                name="tags"
                                    placeholder='Enter tags'
                                    fluid
                                    multiple
                                    search
                                    selection
                                    clearable
                                    options={tagOptions}
                                    value={this.state.tags} 
                                    onChange={this.tagHandler}
                                    style={{backgroundColor: 'transparent', fontSize: '18px'}}
                                />
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


