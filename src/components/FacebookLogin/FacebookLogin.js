import React , { Component } from 'react';
import FacebookLoginBtn from 'react-facebook-login';
import axios from '../../axios';
import { Redirect } from 'react-router-dom';
import Loader from '../UI/Spinner/Spinner';


class FacebookLogin extends Component {
    state = {
        auth: false,
        name: '',
        picture: '',
        loading: true
    }
    componentClicked = () => {
        console.log('Button Clicked');
    }
    responseFacebook = (response) => {
        if(response.status !== 'unknown') {
            this.props.handleSuccessfulAuth(response);
            sessionStorage.setItem('accessToken', response.accessToken);
            let name = response.name.lastIndexOf(' ');
            let firstName = response.name.substring(0,name);
            sessionStorage.setItem('username', firstName);
            sessionStorage.setItem('profilePic', response.picture.data.url )
            this.setState({
                auth: true,
                name: firstName,
                picture: response.picture.data.url,
                loading: false
            });
            axios.get('/api/v1/fb/login?access_token=' + response.accessToken).then(response => {
                // console.log('RES USER',response);
                this.props.handleSuccessfulAuth(response);
                return <Redirect to='/'  />
            }) 
        }
    }
    render() {
        let facebookData;
        let redirect = null;
        if(this.state.loading) {
            facebookData = (<div style={{height: '100vh' , paddingTop: '100px'}}>
                    <Loader />
                </div>)
        }
        if(this.state.auth) {
        redirect = <Redirect to="/" />
        facebookData = (<div style={{fontSize:'30px'}}> Hello {this.state.name}</div>) 
         } else {
            facebookData = (<FacebookLoginBtn
            appId="2332378010392182"
            autoLoad={false}
            fields="name,email,picture,about,address,friends,gender,birthday"
            onClick={this.componentClicked}
            callback={this.responseFacebook} />)
        }
            
        return(
            <div>
                {redirect}
                {facebookData}
            </div>
        )
    }
}

export default FacebookLogin;