import React, { Component } from 'react';
import classes from './BlogsByUser.module.scss';
import PetCard from '../../../components/PetCard/PetCard';
import Aux from '../../../hoc/Auxx';
import { NavLink } from 'react-router-dom';
import axios from '../../../axios';
import Loader from '../../../components/UI/Spinner/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class BlogsByUser extends Component {
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

        if(this.props.location.pathname === '/blogs/user') {
            axios.get( '/api/v1/user/blogs' ,  { headers: {"Authorization" : this.props.accessToken}})
            .then( response => {
                console.log('RESPPPPPPPP', response);
                if(response.data.data.length === 0)  {
                    toast.info('There are no blogs posted by you');
                }
                const posts = response.data;
                console.log('POSTSS', posts);
                const updatedPosts = posts.data.map(post => {
                    return {
                        ...post
                    }
                });
                this.setState({petDetails: updatedPosts , loading: false});
            })
            .catch(error => {
                    toast.error('There is some error retrieving your blogs ' + error );
            });
        } 
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
                            <PetCard key={petDetail.title} title={petDetail.title} shortDesc={petDetail.shortDesc} image={petDetail.image_url}/>
                        </NavLink>
                        
                    );
                });
            }

        return(
            <Aux>
                <div className={classes.container}>
                    {petBlogs}
                </div>
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

export default BlogsByUser;
