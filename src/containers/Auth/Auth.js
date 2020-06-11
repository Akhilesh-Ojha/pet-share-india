import React , { Component } from "react";
import classes from './Auth.module.scss';
import Image1 from '../../assets/pet0.jpg';
import Image2 from '../../assets/pet3.jpg';
import FacebookLogin from '../../components/FacebookLogin/FacebookLogin';

class Auth extends Component {
    state = {
        toggleForm: false
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

    // eventhandler = (data) => {
    //     console.log(data);
    // }

    render() {
        console.log('props in Auth', this.props);
        let initialRender
        initialRender = (
            <div className={`${classes.User} ${classes.SignIn}`}>
                        <div className={classes.ImageBox}>
                            <img className={classes.Image} src={Image1} alt={"pet1"}></img>
                        </div>
                        <div className={classes.FormBox}>
                            <form>
                                <h2> Sign In </h2>
                                <input type="text" name="" placeholder="Username"></input>
                                <input type="text" name="" placeholder="Pawwsword"></input>
                                <button className={classes.Button} type="submit" value="Login">Ready to Adopt? <i className="fa fa-paw" style={{fontSize: '25px'}} aria-hidden="true"></i></button>
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
                            <input type="text" name="" placeholder="User Name"></input>
                            <input type="email" name="" placeholder="Email"></input>
                            <input type="text" name="" placeholder="Enter Password"></input>
                            <input type="text" name="" placeholder="Confirm Password"></input>
                            <button className={classes.Button} type="submit" value="Login">I am all set<i className="fa fa-paw" style={{fontSize: '25px'}} aria-hidden="true"></i></button>
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
            </section>
        )
    }
}

export default Auth;


