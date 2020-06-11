import React, { Component } from 'react';
import classes from './RichTextEditor.module.scss';
import Aux from '../../hoc/Auxx';
import axios from '../../axios';

class RichText extends Component {

    state = {
        showToolbar: true,
        data: ''
    }
    
    constructor(props) {
        super(props);
        console.log('PROP', props); 
        this.richTextContainer = null;
        this.showingSourceCode = false;
        this.isInEditMode = true;
        this.editor = null;
        this.descriptionComingFromProps = null
    }

    componentDidMount() {
        this.editor = this.richTextContainer.contentWindow.document;
        this.editor.designMode = 'On';
        // this.editor.getElementsByTagName('body')[0].innerHTML = this.props.description
    }
   
    componentDidUpdate(prevState , prevProps) {
        
        if(this.props.description && prevState.title !== this.props.title && prevState.shortDesc!== this.props.shortDesc) {
            this.editor.getElementsByTagName('body')[0].innerHTML = this.props.description
        }
    }

    execCommand = (command) => {
        if(this.richTextContainer) {
            this.editor.execCommand(command , false , null);
        }
    }

    execCommandWithArgs = (command , args) => {
        console.log('command', command  ,'args' , args);
        if(this.richTextContainer) {
            this.editor.execCommand(command , false , args);
        }
    }

    toggleSource = () => {
        if(this.showingSourceCode) {
            this.editor.getElementsByTagName('body')[0].innerHTML = this.editor.getElementsByTagName('body')[0].textContent;
            this.showingSourceCode = false;
        } else {
            this.editor.getElementsByTagName('body')[0].textContent = this.editor.getElementsByTagName('body')[0].innerHTML;
            this.showingSourceCode = true;
        }
    }

    toggleEdit = () => {
        if(this.isInEditMode) {
            this.isInEditMode = false;
            this.editor.designMode = 'Off';
        } else {
            this.isInEditMode = true;
            this.editor.designMode = 'On';
        }
    }

    toggleToolBar = () => {
        if(this.state.showToolbar) {
            this.setState({
                showToolbar: false,
            })
        } else {
            this.setState({
                showToolbar: true
            })
        }
    }

    fileSelectedHandler = event => {
        let formData = new FormData();
        let selectedFile = event.target.files[0];
        let userToken = sessionStorage.getItem('accessToken');
        formData.append('image', selectedFile);

        axios.post('/api/v1/blogs/image' , formData ,  { headers: {"Authorization" : userToken}}).then(res => {
            console.log('response from POST Request', res.data.result);
            this.execCommandWithArgs('insertImage', res.data.result)
        });
    }

    parseHTML = () => {
        this.props.sendDataToParent(this.editor.getElementsByTagName('body')[0].innerHTML);
    }
   
    render() {
        let buttonValue = null 
        if(this.props.description) {
            buttonValue =  <button className={classes.SubmitButton} onClick={() => this.parseHTML()}>Edit Blog</button>
        } else {
            buttonValue = <button className={classes.SubmitButton} onClick={() => this.parseHTML()}>Publish</button>
        }
        return(
            <Aux className={classes.toolbar}>
                { this.state.showToolbar ?
                    <Aux>
                        <button className={classes.RichTextButtonMinus}  onClick={() => this.toggleToolBar()}><i style={{width: '100%', height:'100%', fontSize:'16px', color:'black', marginTop: '4px'}} className="fa fa-minus"></i></button>
                        <ul className={classes.toolList}>
                            <li className={classes.tool}><button style={{borderRadius: '25px 0 0 25px' , paddingLeft:'10px'} } className={classes.RichTextButton}  onClick={() => this.execCommand('bold')}><i className="fa fa-bold"></i></button></li>

                            <li className={classes.tool}> <button className={classes.RichTextButton} onClick={() => this.execCommand('italic')}><i className="fa fa-italic"></i></button></li>

                            <li className={classes.tool}><button className={classes.RichTextButton} onClick={() => this.execCommand('underline')}><i className="fa fa-underline"></i></button></li>

                            <li className={classes.tool}><button className={classes.RichTextButton} onClick={() => this.execCommand('justifyLeft')}><i className="fa fa-align-left"></i></button></li>

                            <li className={classes.tool}><button className={classes.RichTextButton} onClick={() => this.execCommand('justifyCenter')}><i className="fa fa-align-center"></i></button></li>

                            <li className={classes.tool}> <button className={classes.RichTextButton} onClick={() => this.execCommand('justifyRight')}><i className="fa fa-align-right"></i></button></li>

                            <li className={classes.tool}><button className={classes.RichTextButton} onClick={() => this.execCommand('indent')}><i className="fa fa-indent"></i></button></li>

                            <li className={classes.tool}><button className={classes.RichTextButton} onClick={() => this.execCommandWithArgs('insertImage', prompt('Enter the Image URL', ''))}><i className="fa fa-picture-o"></i></button></li>

                            
                           
                           
                            <li className={classes.tool}><input style={{display:'none'}} className={classes.Input} type="file" ref = {(inputFile)=> this.inputFile = inputFile} onChange={this.fileSelectedHandler} ></input></li>
                            <li className={classes.tool}><button className={classes.RichTextButton} onClick={() => this.inputFile.click()}><i className="fa fa-picture-o"></i></button></li>

                           
                           
                           
                           
                            <li className={classes.tool}><button className={classes.RichTextButton} onClick={() => this.execCommandWithArgs('createLink' , prompt('Enter a URL', 'http://'))}><i className="fa fa-link"></i></button></li>

                            <li className={classes.tool}><button className={classes.RichTextButton} onClick={() => this.toggleSource()}><i className="fa fa-code"></i></button></li>

                            <li className={classes.tool}><input style={{display:'none'}} className={classes.Input} type="color" ref = {(input)=> this.foreColor = input} onChange={() => this.execCommandWithArgs('foreColor', this.foreColor.value)}></input></li>
                            <li className={classes.tool}><button className={classes.RichTextButton} onClick={() => this.foreColor.click()}><i className="fa fa-eyedropper"></i></button></li>

                            <li className={classes.tool}><select className={classes.DropDown} ref = {(input)=> this.menu = input} onChange={() => this.execCommandWithArgs('formatBlock', this.menu.value)}>
                                <option value="H1">H1</option>
                                <option value="H2">H2</option>
                                <option value="H3">H3</option>
                                <option value="H4">H4</option>
                            </select></li>

                            <li className={classes.tool}><select className={classes.DropDown} ref = {(input)=> this.font = input} onChange={() => this.execCommandWithArgs('fontName', this.font.value)}>
                                <option value="Arial">Arial</option>
                                <option value="Comic Sans MS">Comic Sans MS</option>
                                <option value="Courier">Courier</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Times New Roman">Times New Roman</option>
                            </select></li>

                            <li className={classes.tool}><select style={{borderRadius: '0 25px 25px 0'}} className={classes.DropDown} ref = {(input)=> this.fontSize = input} onChange={() => this.execCommandWithArgs('fontSize', this.fontSize.value)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                            </select></li>
                        </ul> 

                        
                    </Aux>
                    
                :  <button className={classes.RichTextButtonPlus}  onClick={() => this.toggleToolBar()}><i style={{width: '100%', height:'100%', fontSize:'16px', color:'black', marginTop: '4px'}} className="fa fa-plus"></i></button>

            }
            <iframe className={classes.TextArea}  title="Enter Description"
                        ref={richTextContainer => this.richTextContainer = richTextContainer} 
                        id="richTextContainer" name="richTextContainer" frameBorder="0" ></iframe>

            <div className={classes.SubmitArea}>
                {buttonValue}
                {/* <button className={classes.SubmitButton} onClick={() => this.parseHTML()}>Publish</button> */}
            </div>

            </Aux>
        )
    }
}
    

export default RichText;