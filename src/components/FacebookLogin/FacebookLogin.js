import React , { Component } from 'react';
import FacebookLoginBtn from 'react-facebook-login';
import axios from '../../axios';
import Aux from '../../hoc/Auxx';
import { ToastContainer, toast } from 'react-toastify';

class FacebookLogin extends Component {

    componentClicked = () => {
    }
    
    responseFacebook = (response) => {
        if(response.status !== 'unknown') {
            axios.get('/api/v1/fb/login?access_token=' + response.accessToken).then(response => {
                this.props.handleSuccessfulAuth(response);
            }).catch( error => {
                toast.error('There is some error loggin you in ' + error);
            });
        }
    }
    render() {
        return(
            <Aux>
                <FacebookLoginBtn
                appId="2332378010392182"
                autoLoad={false}
                fields="name,email,picture,about,address,friends,gender,birthday"
                onClick={this.componentClicked}
                callback={this.responseFacebook} 
                // isMobile={false}
                // cookie={true}
                // xfbml={true}
                // version={"3.2"}
                disableMobileRedirect={true}
                />
    
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
        )
    }
}

export default FacebookLogin;