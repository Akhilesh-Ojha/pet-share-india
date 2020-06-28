import React , { Component } from "react";
import classes from './Auth.module.scss';
import Image1 from '../../assets/pet0.jpg';
import Image2 from '../../assets/pet3.jpg';
import FacebookLogin from '../../components/FacebookLogin/FacebookLogin';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../axios';

class Auth extends Component {
    state = {
        toggleForm: false,
        userName: '',
        setPassword: '',
        confirmPassword: '',
        email: '',
        loginEmail: '',
        loginPass: ''
    }

    
    toggleForm = (e) => {
        e.preventDefault();
        this.setState({
            toggleForm: !this.state.toggleForm
        })
    }

    handleSuccessfulAuth = (data) => {
        this.props.handleLogin(data)
        this.props.history.push('/');
    }

    onUserNameHandler = (event) => {
        this.setState({
            userName: event.target.value
        })
    }

    emailHandler = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    passwordHandler = (event) => {
        this.setState({
            setPassword: event.target.value
        })
    }

    confirmPasswordHandler = (event) => {
        // this.setState({
        //     confirmPassword: event.target.value
        // })
    }


    handleSignUp =  (e) => {
        e.preventDefault();
        let body = {
            'email': this.state.email,
            'password': this.state.setPassword,     
            'userName': this.state.userName      
        }

        axios.post('/api/v1/petshare/signup' , body).then(res => {
            this.handleSuccessfulAuth(res);
        }).catch(error => {
            toast.error('There is some error signing you up ' + error );
        });
    };

    onUserNameLoginHandler = (event) => {
        this.setState({
            loginEmail: event.target.value
        })

    }

    onPasswordLoginHandler = (event) => {
        this.setState({
            loginPass: event.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault();
        let body = {
            'email': this.state.loginEmail,
            'password': this.state.loginPass,     
        }
        axios.post('/api/v1/petshare/login' , body).then(res => {
            this.handleSuccessfulAuth(res);
        }).catch(error => {
            toast.error('There is some error logging you in ' + error );
        });
    }


    render() {
        let initialRender
        initialRender = (
            <div className={`${classes.User} ${classes.SignIn}`}>
                        <div className={classes.ImageBox}>
                            <img className={classes.Image} src={Image1} alt={"pet1"}></img>
                        </div>
                        <div className={classes.FormBox}>
                            <form>
                                <h2> Sign In </h2>
                                <input type="text" onChange={this.onUserNameLoginHandler} name="" placeholder="Username"></input>
                                <input type="text" onChange={this.onPasswordLoginHandler} name="" placeholder="Pawwsword"></input>
                                <button className={classes.Button} onClick={(e) => this.handleLogin(e)} type="submit" value="Login">Ready to Adopt? <i className="fa fa-paw" style={{fontSize: '25px'}} aria-hidden="true"></i></button>
                                <p className={classes.SignUp}>Don't have an account?</p> 
                                <button className={classes.AnchorButton} onClick={this.toggleForm}>Sign Up</button> 
                                <FacebookLogin handleSuccessfulAuth={this.handleSuccessfulAuth} className={classes.FaceBookButton} />
                            </form>
                        </div>
                    </div>
        )

        if(this.state.toggleForm === true) {
            initialRender = (
                <div className={`${classes.User} ${classes.SignUp}`}>
                    <div className={classes.FormBox}>
                        <form>
                            <h2> Create an account </h2>
                            <input type="text" name="" onChange={this.onUserNameHandler} placeholder="User Name"></input>
                            <input type="email" name="" onChange={this.emailHandler} placeholder="Email"></input>
                            <input type="password" name="" onChange={this.passwordHandler} placeholder="Enter Password"></input>
                            <input type="password" name="" onChange={this.confirmPasswordHandler} placeholder="Confirm Password"></input>
                            <button className={classes.Button} type="submit" onClick={(e) => this.handleSignUp(e)} value="Login">I am all set<i className="fa fa-paw" style={{fontSize: '25px'}} aria-hidden="true"></i></button>
                            <p className={classes.SignUp}>Already have an account?  </p> <button className={classes.AnchorButton} onClick={this.toggleForm}>Login </button>
                        </form>
                    </div>

                    <div className={classes.ImageBox}>
                        <img className={classes.Image} src={Image2} alt={"pet2"}></img>
                    </div>
                </div> 
            )
        }
        return(
            <section className={classes.Section}>
                <div className={classes.Container} ref={container => this.container = container}>
                    
                    {initialRender}
                    
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
            </section>
        )
    }
}

export default Auth;


