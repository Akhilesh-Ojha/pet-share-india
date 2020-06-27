import React , { Component } from 'react';
import classes from './FullPetDetails.module.scss';
import axios from '../../../axios';
import Loader from '../../../components/UI/Spinner/Spinner';
import ReactHtmlParser from 'react-html-parser';
import { NavLink } from 'react-router-dom';
import CookieCrumbs from '../../../assets/cookie_crumbs.svg';
class FullPetDetails extends Component {

    counter = 0;

    state = {
        loadedPost: null,
        treats: 2,
        readTime: 1,
    }
    
    componentDidMount() {
        window.scrollTo(0,0);
        let headerToken = null
        console.log('PROPS IN FULL', this.props);
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id) ) {
                if(this.props.accessToken !== '') {
                    //  headerToken =  this.props.accessToken
                     headerToken = {"Authorization" : this.props.accessToken}
                }
                console.log('HD', headerToken);
                axios.get( '/api/v1/blogs/' +  this.props.match.params.id, { headers: headerToken})
                    .then( response => {
                        console.log('response of full desc', response.data.data.Blog);
                        var wordCount = ReactHtmlParser(response.data.data.Blog.description.split(' ').length);
                        var time = Math.round(wordCount[0] / 200);
                        // console.log('time', Math.round(time));
                        var finalTime
                        if(time < 1) {
                            finalTime = 1
                        } else {
                            finalTime = time
                        }
                        this.setState( { loadedPost: response.data.data.Blog , readTime: finalTime } );
                        var sectionDetails = this.section;
                        window.addEventListener('scroll', () => {
                            var value = window.scrollY;
                            if(sectionDetails) {
                                sectionDetails.style.clipPath  = "circle("+ value + "px at center)";
                            }
                        });
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
            });

        }
    }

    treatIncrement = () => {
        
        ++this.counter;
        if(this.counter <= 20) {

            this.setState({
                treats: this.state.treats + 1
            })
        }
    }
    
    render() {
        let blog = null;
        let buttons = null
        if ( this.props.match.params.id ) {
            blog = (
                <div style={{height: '100vh' , paddingTop: '100px'}}>
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
        return (blog);
    }
}

export default FullPetDetails;