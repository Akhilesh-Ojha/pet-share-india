import React , { Component } from 'react';
import FacebookLoginBtn from 'react-facebook-login';
import axios from '../../axios';

class FacebookLogin extends Component {

    componentClicked = () => {
    }
    
    responseFacebook = (response) => {
        if(response.status !== 'unknown') {
            axios.get('/api/v1/fb/login?access_token=' + response.accessToken).then(response => {
                this.props.handleSuccessfulAuth(response);
            }) 
        }
    }
    render() {
        return(
            <FacebookLoginBtn
            appId="2332378010392182"
            autoLoad={false}
            fields="name,email,picture,about,address,friends,gender,birthday"
            onClick={this.componentClicked}
            callback={this.responseFacebook} />
        )
    }
}

export default FacebookLogin;