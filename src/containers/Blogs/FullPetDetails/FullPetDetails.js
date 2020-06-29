import React , { Component } from 'react';
import classes from './FullPetDetails.module.scss';
import axios from '../../../axios';
import Loader from '../../../components/UI/Spinner/Spinner';
import ReactHtmlParser from 'react-html-parser';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import CookieCrumbs from '../../../assets/cookie_crumbs.svg';
import Aux from '../../../hoc/Auxx';

class FullPetDetails extends Component {

    counter = 0;

    state = {
        loadedPost: null,
        treats: 0,
        readTime: 1,
    }
    
    componentDidMount() {
        window.scrollTo(0,0);
        let headerToken = null
        console.log('PROPS IN FULL', this.props);
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id) ) {
                if(this.props.accessToken !== '') {
                     headerToken = {"Authorization" : this.props.accessToken}
                }
                console.log('HD', headerToken);
                axios.get( '/api/v1/blogs/' +  this.props.match.params.id, { headers: headerToken})
                    .then( response => {
                        console.log('response of full desc', response.data.data.Blog);
                        var wordCount = ReactHtmlParser(response.data.data.Blog.description.split(' ').length);
                        var time = Math.round(wordCount[0] / 200);
                        var finalTime
                        if(time < 1) {
                            finalTime = 1
                        } else {
                            finalTime = time
                        }
                        this.setState( { loadedPost: response.data.data.Blog , readTime: finalTime, treats: response.data.data.Blog.cookie } );
                        var sectionDetails = this.section;
                        window.addEventListener('scroll', () => {
                            var value = window.scrollY;
                            if(sectionDetails) {
                                sectionDetails.style.clipPath  = "circle("+ value + "px at center)";
                            }
                        });
                    }).catch(error => {
                        toast.error('There is some error retrieving this Blog ' + error);
                    });
            }
        }
    }

    deletePostHandler = () => {
        var confirmation = window.confirm("Are you sure you want to delete the post?");
        if(confirmation) {
            axios.delete('/api/v1/blogs/' + this.props.match.params.id ,  { headers: {"Authorization" : this.props.accessToken} } )
                .then(response => {
                    console.log(response);
                    this.props.history.push('/');
            }).catch(error => {
                toast.error('There is some error deleting this Blog ' + error);
            });
        }
    }

    treatIncrement = () => {
        ++this.counter;
        axios.post('/api/v1/blogs/' + this.props.match.params.id  + '/cookie', {}  ,{ headers: {"Authorization" : this.props.accessToken} } )
                .then(response => {
                    console.log(response);
            }).catch(error => {
                toast.error('An error occured' + error);
        });
        if(this.counter <= 10) {
            this.setState({
                treats: +this.state.treats + 1
            })
        }
    }
    
    render() {
        let blog = null;
        let buttons = null
        if ( this.props.match.params.id ) {
            blog = (
                <div style={{height: '75vh'}}>
                    <Loader />
                </div>
            )
        }
        if ( this.state.loadedPost ) {
            if(this.state.loadedPost.is_owner) {
                buttons = (
                    <div className={classes.Button}>
                        <NavLink to={{pathname: '/blogs/' + this.props.match.params.id + '/edit'}}>
                        {/* <NavLink to={'/blogs/' + this.props.match.params.id + '/edit'}> */}
                            <button className={classes.Button__Edit}>Edit</button>
                        </NavLink>
                        <button className={classes.Button__Delete} onClick={this.deletePostHandler}>Delete</button>
                    </div>
                )
            }
            blog = (
                <div className={classes.FullPetDetailsContainer}>
                    <div className={classes.Title}>
                        <h2 >{this.state.loadedPost.title}</h2>
                        <div></div>
                        <h5>A {this.state.readTime} min read, written by:</h5>
                        <h3>{this.state.loadedPost.author}</h3>
                        <p  style={{fontSize: '12px', fontWeight:500}} ><span style={{fontSize: '12px', marginRight: '5px'}}>On-</span>June 03</p>
                    </div>
                    <section className={classes.Section} style={{backgroundImage: `url(${this.state.loadedPost.image_url})`}} ref={section => this.section = section}></section>
                    <div className={classes.TextContainer}>
                        {ReactHtmlParser(this.state.loadedPost.description)}
                        <div className={classes.Rating}>
                            <p className={classes.Rating__Text}>Liked this Post? Send a Cookie.</p>
                            <div className={classes.Treatos}>
                                <img src={CookieCrumbs} className={classes.CookieIcon} alt={""} onClick={this.treatIncrement}></img>
                                <p className={classes.TreatCount}>Treatos: <span>{this.state.treats}</span></p>
                            </div>
                        </div>
                        {buttons}
                    </div>
                </div >
            );
        }
        return (
            <Aux>
                {blog}
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
            </Aux>
        );
    }
}

export default FullPetDetails;