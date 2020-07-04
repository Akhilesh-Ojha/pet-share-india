import React , { Component } from 'react';
import classes from './FullPetDetails.module.scss';
import axios from '../../../axios';
import Loader from '../../../components/UI/Spinner/Spinner';
import ReactHtmlParser from 'react-html-parser';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import CookieCrumbs from '../../../assets/cookie_crumbs.svg';
import Aux from '../../../hoc/Auxx';
import PopularBlogs from '../../../components/PopularBlogs/PopularBlogs';

class FullPetDetails extends Component {

    counter = 0;

    state = {
        loadedPost: null,
        treats: 0,
        readTime: 1,
        popularBlogs: [],
        userDetails: null
    }
    
    componentDidMount() {
        let headerToken = null;
        console.log('PROPS IN FULL', this.props);
        if ( this.props.match.params.id ) {
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id) ) {
                if(this.props.accessToken !== '') {
                     headerToken = {"Authorization" : this.props.accessToken}
                }
                
                axios.get( '/api/v1/blogs/' +  this.props.match.params.id, { headers: headerToken})
                    .then( response => {
                        window.scrollTo(0,0);
                        console.log('response of full desc pop' , response.data.popular_blogs);
                        var wordCount = ReactHtmlParser(response.data.data.Blog.description.split(' ').length);
                        var time = Math.round(wordCount[0] / 200);
                        var finalTime
                        if(time < 1) {
                            finalTime = 1
                        } else {
                            finalTime = time
                        }
                        this.setState( { loadedPost: response.data.data.Blog , readTime: finalTime, treats: response.data.data.Blog.cookie , popularBlogs: response.data.popular_blogs.slice(0,3) , userDetails: response.data.user_details } );
                    }).catch(error => {
                        toast.error('There is some error retrieving this Blog ' + error);
                    });
            }
        }
    }


    componentDidUpdate(prevProps, prevState) {
        
        let headerToken = null;
        if(prevProps.location.pathname !== this.props.location.pathname) {
            if(this.props.accessToken !== '') {
                headerToken = {"Authorization" : this.props.accessToken}
           }
           toast.info('Hang On! Retrieving Blog...');
            axios.get( '/api/v1/blogs/' +  this.props.match.params.id, { headers: headerToken})
                    .then( response => {
                        
                        window.scrollTo(0 , 0)
                        
                        toast.dismiss();
                        console.log('response of full desc pop' , response.data.user_details);
                        var wordCount = ReactHtmlParser(response.data.data.Blog.description.split(' ').length);
                        var time = Math.round(wordCount[0] / 200);
                        var finalTime
                        if(time < 1) {
                            finalTime = 1
                        } else {
                            finalTime = time
                        }
                        this.setState( { loadedPost: response.data.data.Blog , readTime: finalTime, treats: response.data.data.Blog.cookie , popularBlogs: response.data.popular_blogs.slice(0,3), userDetails: response.data.user_details } );
                        // var sectionDetails = this.section;
                        // window.addEventListener('scroll', () => {
                        //     var value = window.scrollY;
                        //     if(sectionDetails) {
                        //         sectionDetails.style.clipPath  = "circle("+ value + "px at center)";
                        //     }
                        // });
                    }).catch(error => {
                        toast.dismiss();
                        toast.error('There is some error retrieving this Blog ' + error);
                    });
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
                    this.setState({
                        treats: +this.state.treats + 1
                    })
                    // console.log(response);
            }).catch(error => {
                toast.info('Enough treats for the pet :)')
        });
        // if(this.counter <= 5) {
            
        // }
    }
    
    render() {
        let blog = null;
        let buttons = null;
        let popularBlogs = null;
        if ( this.props.match.params.id ) {
            blog = (
                <div style={{height: '100vh' ,paddingTop: '100px'}}>
                    <Loader />
                </div>
            )
        }
            if ( this.state.loadedPost ) {
                popularBlogs = this.state.popularBlogs.map(popularBlog => {
                return(
                        <NavLink style={{ textDecoration: 'none', color: 'black' }} to={'/blogs/' + popularBlog.id}  key={popularBlog.id} >
                            <PopularBlogs key={popularBlog.title} author={popularBlog.author} title={popularBlog.title} description={popularBlog.shortDesc} image={popularBlog.image_url[0]}/>
                        </NavLink>
                )
            })
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
                <div className={classes.PageWrapper}> 
                    <div className={classes.Content}>

                    <div className={classes.MainContent}>
                        <h2 className={classes.PostTitle}>{this.state.loadedPost.title}</h2>
                        <div className={classes.Author}>
                            <div className={classes.ImgAuthor}>
                                <img  src={this.state.userDetails.picture}></img>
                            </div>

                            <div className={classes.DescAuthor}>
                                <p className={classes.p1}>{this.state.userDetails.name}</p>
                                <p className={classes.p2}>{this.state.loadedPost.date} | {this.state.readTime} min read</p>

                            </div>
                        </div>
                        <div className={classes.PostImage}>

                            <img  src={this.state.loadedPost.image_url[0]}></img>
                        </div>
                        <div className={classes.PostDesc}>
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
                    </div>   
                    <h2 className={classes.SectionTitle}> More From Pet Share </h2>
                    <div className={classes.SectionLine}></div>
                    {/* <div className={classes.SideBar}> */}
                        <div className = {classes.SectionPopular}>
                                    {popularBlogs}
                                </div>
                    {/* </div> */}
                    </div>
                </div >
            );
        }
        return (
            <Aux>
                {blog}
                <ToastContainer 
                    position="bottom-right"
                    autoClose={false}
                    hideProgressBar={false}
                    newestOnTop={false}
                    rtl={false}
                    draggable
                />
            </Aux>
        );
    }
}

export default FullPetDetails;



// {/* <h2 >{this.state.loadedPost.title}</h2>
//                         <div></div>
//                         <h5>A {this.state.readTime} min read, written by:</h5>
//                         <h3>{this.state.loadedPost.author}</h3>
//                         <p  style={{fontSize: '12px', fontWeight:500}} ><span style={{fontSize: '12px', marginRight: '5px'}}>On-</span>June 03</p>
//                     </div>
//                     {/* <section className={classes.Section} style={{backgroundImage: `url(${this.state.loadedPost.image_url})`}} ref={section => this.section = section}></section> */}
//                     {/* <div className={classes.TextContainer}>
//                         {ReactHtmlParser(this.state.loadedPost.description)}
//                         <div className={classes.Rating}>
//                             <p className={classes.Rating__Text}>Liked this Post? Send a Cookie.</p>
//                             <div className={classes.Treatos}>
//                                 <img src={CookieCrumbs} className={classes.CookieIcon} alt={""} onClick={this.treatIncrement}></img>
//                                 <p className={classes.TreatCount}>Treatos: <span>{this.state.treats}</span></p>
//                             </div>
//                         </div>
//                         {buttons}
//                     </div> */} */}