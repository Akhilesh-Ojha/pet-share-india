import React, { Component } from 'react';
import classes from './Pets.module.scss';
import PetCard from '../../components/PetCard/PetCard';
import Aux from '../../hoc/Auxx';
import { NavLink } from 'react-router-dom';
import axios from '../../axios';
import Loader from '../../components/UI/Spinner/Spinner';

class Pets extends Component {
    state = {
            petDetails:[],
            loading: true
    }

    componentDidMount () {
        let userToken = sessionStorage.getItem('accessToken');
        axios.get( '/api/v1/blogs' , { headers: {"Authorization" : userToken} } )
            .then( response => {
                console.log('RESPONSE', response);
                const posts = response.data;
                const updatedPosts = posts.data.map(post => {
                    return {
                        ...post
                    }
                });
                this.setState({petDetails: updatedPosts , loading: false});
            } )
            .catch(error => {
                 console.log(error);
            });
    }

    render() {
            console.log('PROPS, PEts', this.props);
            let petBlogs;

            if(this.state.loading) {
                // console.log('Loadingggg');
                petBlogs = (
                    <div style={{height: '100vh' , paddingTop: '100px'}}>
                        <Loader />
                    </div>
                )
            }
        
            petBlogs = this.state.petDetails.map(petDetail => {
                return(
                    <NavLink style={{ textDecoration: 'none', color: 'black' }} to={'/' + petDetail.id}  key={petDetail.id} >
                        <PetCard key={petDetail.title} title={petDetail.title} shortDesc={petDetail.shortDesc} image={petDetail.image_url}/>
                    </NavLink>
                    
                );
            });

        return(
            <Aux>
                <div className={classes.container}>
                    {petBlogs}
                </div>
                <NavLink className={classes.Anchor} to={{pathname: '/new-blog'}}>
                 <button className={classes.Button}><i style={{width: '100%', height:'100%', fontSize: '16px' ,  marginTop: '4px', color: 'black'}} className="fa fa-plus"></i></button>
                </NavLink>
            </Aux>
        );
    }
}

export default Pets;
