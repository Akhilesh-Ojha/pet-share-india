import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
import './QuillEditor.css';
import axios from '../../axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const __ISMSIE__ = navigator.userAgent.match(/Trident/i) ? true : false;



const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida"
];
Quill.register(Font, true);


const BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {

    static create(value) {
        const imgTag = super.create();
        imgTag.setAttribute('src', value.src);
        imgTag.setAttribute('alt', value.alt);
        imgTag.setAttribute('width', '100%');
        return imgTag;
    }

    static value(node) {
        return { src: node.getAttribute('src'), alt: node.getAttribute('alt') };
    }

}

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';
Quill.register(ImageBlot);


class QuillEditor extends React.Component {

    bandId;
    placeholder;
    onEditorChange;
    onFilesChange;
    onPollsChange;
    _isMounted;

    constructor(props) {
        super(props);

        this.state = {
            editorHtml: __ISMSIE__ ? "<p>&nbsp;</p>" : "",
            files: [],
        };

        this.reactQuillRef = null;

        this.inputOpenImageRef = React.createRef();
        this.inputOpenVideoRef = React.createRef();
        this.inputOpenFileRef = React.createRef();
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevState , prevProps) {
        if(this.props.description && prevState.title !== this.props.title && prevState.shortDesc!== this.props.shortDesc) {

            this.setState({
                editorHtml: this.props.description
            })
        }
        
    }

    handleChange = (html) => {
        console.log(html);
        this.setState({
            editorHtml: html
        }, () => {
            this.props.onEditorChange(this.state.editorHtml);
        });
    };

    imageHandler = () => {
        this.inputOpenImageRef.current.click();
    };

    insertImage = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.currentTarget && e.currentTarget.files && e.currentTarget.files.length > 0) {
            const file = e.currentTarget.files[0];
            let userToken = sessionStorage.getItem('accessToken');
            let formData = new FormData();
            formData.append("image", file);

            toast.info('Just a moment! Uploading Image...');
            axios.post('/api/v1/blogs/image' , formData ,  { headers: {"Authorization" : userToken}}).then(res => {
                    
                        toast.dismiss();
                        const quill = this.reactQuillRef.getEditor();
                        quill.focus();
                        let range = quill.getSelection();
                        let position = range ? range.index : 0;
                        quill.insertEmbed(position, "image", { src: res.data.result, alt: "editor pic" });
                        quill.setSelection(position + 1);
                    
            }).catch(error => {
                toast.error('There is some error posting image' + error);
            });
        }
    };



    render() {
        
        return (
            <div>
                <div id="toolbar">
                    {/* <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
                        <option value="1" />
                        <option value="2" />
                        <option value="" />
                    </select> */}
                    <button class="ql-header" value="1"></button>
                    <button class="ql-header" value="2"></button>
                    <button className="ql-bold" />
                    <button className="ql-italic" />
                    <button className="ql-underline" />
                    <button className="ql-strike" />
                    
                    <select className="ql-align" />
                    <button class="ql-list" value="ordered"></button>
                    <button class="ql-list" value="bullet"></button>

                    <button class="ql-indent" value="-1"></button>
                    <button class="ql-indent" value="+1"></button>

                    <button className="ql-link" />

                    

                    <select className="ql-font">
                        <option value="arial" selected>
                            Arial
                        </option>
                        <option value="comic-sans">Comic Sans</option>
                        <option value="courier-new">Courier New</option>
                        <option value="georgia">Georgia</option>
                        <option value="helvetica">Helvetica</option>
                        <option value="lucida">Lucida</option>
                        </select>
                    <select className="ql-size">
                        <option value="extra-small">Size 1</option>
                        <option value="small">Size 2</option>
                        <option value="medium" selected>
                            Size 3
                        </option>
                        <option value="large">Size 4</option>
                    </select>
                    <button className="ql-code-block" />
                    <button className="ql-insertImage">
                        <i class="fa fa-picture-o" aria-hidden="true"></i>
                    </button>
                    <button className="ql-video" />
                    <button className="ql-blockquote" />
                    <select class="ql-color" ></select>
                    <select class="ql-background" ></select>
                    <button className="ql-clean" />
                </div>
                <ReactQuill
                    ref={(el) => { this.reactQuillRef = el }}
                    theme={'snow'}
                    onChange={this.handleChange}
                    modules={this.modules}
                    formats={this.formats}
                    value={this.state.editorHtml}
                    placeholder={this.props.placeholder}
                />
                <input type="file" accept="image/*" ref={this.inputOpenImageRef} style={{ display: "none" }} onChange={this.insertImage} />

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

    modules = {
        // syntax: true,
        toolbar: {
            container: "#toolbar",
            handlers: {
                insertImage: this.imageHandler
            }
        },

    };

    formats = [
        
        'header', 'header', 'bold', 'italic', 'underline', 'strike', 
         'align' ,'list' , 'list' ,'indent', 'indent',  'link', "code-block", 'image', "video" , "blockquote", "font", "color", "background", "clean"
    ];
}

export default QuillEditor;