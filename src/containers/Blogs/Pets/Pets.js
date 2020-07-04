import React, { Component } from 'react';
import classes from './Pets.module.scss';
import PetCard from '../../../components/PetCard/PetCard';
import Aux from '../../../hoc/Auxx';
import { NavLink } from 'react-router-dom';
import axios from '../../../axios';
import Loader from '../../../components/UI/Spinner/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Pets extends Component {
    state = {
            petDetails:[],
            loading: false
    }

    componentDidMount () {
        
        window.scrollTo(0,0);
        this.setState({
            loading: true
        });
        console.log('this.props.location.pathname', this.props.location.pathname);

        
        axios.get( '/api/v1/blogs')
        .then( response => {
            if(response.data.data.length === 0)  {
                toast.info('There are no blogs to show');
            }
            const posts = response.data;
            const updatedPosts = posts.data.map(post => {
                return {
                    ...post
                }
            });
            this.setState({petDetails: updatedPosts , loading: false});
        })
        .catch(error => {
                toast.error('There is some error retrieving blogs ' + error );
        });

        
    }

    render() {
            let petBlogs;
            if(this.state.loading) {
                petBlogs = (
                    <div style={{height: '75vh', width: '100vw', marginTop: '20px'}}>
                        <Loader />
                    </div>
                )
            } else {
                petBlogs = this.state.petDetails.map(petDetail => {
                    return(
                        <NavLink style={{ textDecoration: 'none', color: 'black' }} to={'/blogs/' + petDetail.id}  key={petDetail.id} >
                            <PetCard key={petDetail.title} title={petDetail.title} shortDesc={petDetail.shortDesc} image={petDetail.image_url[0]}/>
                        </NavLink>
                        
                    );
                });
            }

            let redirectAddLink = null;

            if(this.props.accessToken) {
                redirectAddLink = (
                    <NavLink className={classes.Anchor} to={{pathname: '/blogs/new-blog'}}>
                        <button className={classes.Button}><i style={{width: '100%', height:'100%', fontSize: '16px' ,  marginTop: '4px', color: '#f5f5f5'}} className="fa fa-plus"></i></button>
                    </NavLink>
                )
            } else {
                redirectAddLink = (
                    <NavLink className={classes.Anchor} to={{pathname: '/auth'}}>
                        <button className={classes.Button}><i style={{width: '100%', height:'100%', fontSize: '16px' ,  marginTop: '4px', color: '#f5f5f5'}} className="fa fa-plus"></i></button>
                    </NavLink>
                )
            }
        

        return(
            <Aux>
                <div className={classes.container}>
                    {petBlogs}
                </div>
                {redirectAddLink}
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

export default Pets;
