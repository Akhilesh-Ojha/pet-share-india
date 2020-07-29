import React , { Component } from "react";
import classes from './Auth.module.scss';
import Image1 from '../../assets/pet0.jpg';
import Image2 from '../../assets/pet3.jpg';
import FacebookLogin from '../../components/FacebookLogin/FacebookLogin';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../axios';
import Input from '../../components/UI/Input/Input';

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class Auth extends Component {
    state = {
        toggleForm: false,

        signUpForm: {
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name',
                    maxLength: 20
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 20
                },
                valid: false,
                validationMessage: '',
                touched: false
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name',
                    maxLength: 20
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 20
                },
                valid: false,
                validationMessage: '',
                touched: false
            },
             
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    emailRegex: true
                },
                valid: false,
                validationMessage: '',
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLenght: 6
                },
                validationMessage: '',
                valid: false,
                touched: false
            },

        },
    }

    
    toggleForm = (e) => {
        e.preventDefault();
        this.setState({
            toggleForm: !this.state.toggleForm
        })
    }

    handleSuccessfulAuth = (data) => {
        this.props.handleLogin(data);
        
        this.props.history.push('/');
    }

    checkValidity(value, rules) {
        let isValid = true;
        let errorMessage = ''
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;

            if(isValid === false) {
                errorMessage = 'Required Fields are Missing'
            }
        }

        if(rules.minLenght) {
            isValid = value.length >= rules.minLenght && isValid;

            if(isValid === false) {
                errorMessage = 'Password should have a minimum lenght of 6'
            }
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if(rules.emailRegex) {
            isValid = emailRegex.test(value) && isValid;
            if(isValid === false) {
                errorMessage = 'Please enter a valid email address'
            }
        }
        return {
            isValid: isValid,
            errorMessage: errorMessage,
        };;
    }

    handleChange = (event, inputIdentifier) => {
        event.preventDefault();
        const updatedSignUpForm = {
            ...this.state.signUpForm
        }
        const updatedFormElement = {
            ...updatedSignUpForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        let validationValues = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.valid = validationValues.isValid;
        updatedFormElement.validationMessage = validationValues.errorMessage
        updatedFormElement.touched = true
        updatedSignUpForm[inputIdentifier] = updatedFormElement;

        this.setState({
            signUpForm: updatedSignUpForm
        })
        

    };


    handleSignUp =  (event) => {
        event.preventDefault();
        const formData = {};
        
        for(let signUpFormKey in this.state.signUpForm) {
            formData[signUpFormKey] = this.state.signUpForm[signUpFormKey].value;
        }
        let name = formData.firstName + ' ' + formData.lastName;
        formData['name'] = name;

        axios.post('/api/v1/petshare/signup' , formData).then(res => {
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
            console.log('RESPONSE', res);
            this.handleSuccessfulAuth(res);
        }).catch(error => {
            toast.error('There is some error logging you in ' + error );
        });
    }


    render() {
        // const { formErrors } = this.state;
        const formElementArray = [];
        for(let key in this.state.signUpForm) {
            formElementArray.push({
                id: key,
                config: this.state.signUpForm[key]
            })
        }

        let initialRender
        initialRender = (
            <div className={`${classes.User} ${classes.SignIn}`}>
                        <div className={classes.ImageBox}>
                            <img className={classes.Image} src={Image1} alt={"pet1"}></img>
                        </div>
                        <div className={classes.FormBox}>
                            <form>
                                <h2> Sign In </h2>
                                <input type="text" className={classes.Input} onChange={this.onUserNameLoginHandler} name="" placeholder="Username"></input>
                                <input type="text" className={classes.Input} onChange={this.onPasswordLoginHandler} name="" placeholder="Pawwsword"></input>
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

                            {formElementArray.map(formElement => (
                                <Input key={formElement.id} elementType={formElement.config.elementType} 
                                elementConfig={formElement.config.elementConfig} 
                                value={formElement.config.value} 
                                invalid={!formElement.config.valid}
                                touched={formElement.config.touched}
                                valueType={formElement.config.elementConfig.placeholder}
                                validationMessage={formElement.config.validationMessage}
                                changed={(event) => this.handleChange(event, formElement.id)}/>
                            ))}
                            
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



















// import React , { Component } from "react";
// import classes from './Auth.module.scss';
// import Image1 from '../../assets/pet0.jpg';
// import Image2 from '../../assets/pet3.jpg';
// import FacebookLogin from '../../components/FacebookLogin/FacebookLogin';
// import { ToastContainer, toast } from 'react-toastify';
// import axios from '../../axios';

// const emailRegex = RegExp(
//     /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
// );

// const formValid = ({ formErrors, ...rest }) => {
//     let valid = true;
  
//     // validate form errors being empty
//     Object.values(formErrors).forEach(val => {
//       val.length > 0 && (valid = false);
//     });
  
//     // validate the form was filled out
//     Object.values(rest).forEach(val => {
//       val === null && (valid = false);
//     });
  
//     return valid;
// };

// class Auth extends Component {
//     state = {
//         toggleForm: false,
//         firstName: null,
//         lastName: null,
//         email: null,
//         password: null,
//         formErrors: {
//             firstName: "",
//             lastName: "",
//             email: "",
//             password: ""
//         },
//         loginEmail: '',
//         loginPass: ''
//     }

    
//     toggleForm = (e) => {
//         e.preventDefault();
//         this.setState({
//             toggleForm: !this.state.toggleForm
//         })
//     }

//     handleSuccessfulAuth = (data) => {
//         this.props.handleLogin(data)
//         this.props.history.push('/');
//     }


//     handleChange = e => {
//         e.preventDefault();
//         const { name, value } = e.target;
//         let formErrors = { ...this.state.formErrors };
    
//         switch (name) {
//           case "firstName":
//             formErrors.firstName = value.length < 3 ? "Minimum 3 characaters required" : "";
//             break;
//           case "lastName":
//             formErrors.lastName = value.length < 3 ? "Minimum 3 characaters required" : "";
//             break;
//           case "email":
//             formErrors.email = emailRegex.test(value) ? "" : "Invalid email address";
//             break;
//           case "password":
//             formErrors.password = value.length < 6 ? "Minimum 6 characaters required" : "";
//             break;
//           default:
//             break;
//         }
    
//         this.setState({ formErrors, [name]: value }, () => console.log(this.state));
//       };


//     handleSignUp =  (e) => {
//         e.preventDefault();

//         if (formValid(this.state)) {
//             if(this.state.firstName === null || this.state.lastName === null || this.state.email === null || this.state.password === null) {
//                 toast.error('All the fields are required');
//             } else {
//                 let name = this.state.firstName + ' ' + this.state.lastName;
//                 let body = {
//                     'firstName': this.state.firstName,
//                     'lastName': this.state.lastName,
//                     'email': this.state.email,
//                     'password': this.state.password,
//                     'name': name
//                 }
//                 axios.post('/api/v1/petshare/signup' , body).then(res => {
//                     this.handleSuccessfulAuth(res);
//                 }).catch(error => {
//                     toast.error('There is some error signing you up ' + error );
//                 });
//             }
//         } else {
//             toast.error('Please fill valid datas');
//         }
//     };

//     onUserNameLoginHandler = (event) => {
//         this.setState({
//             loginEmail: event.target.value
//         })

//     }

//     onPasswordLoginHandler = (event) => {
//         this.setState({
//             loginPass: event.target.value
//         })
//     }

//     handleLogin = (e) => {
//         e.preventDefault();
//         let body = {
//             'email': this.state.loginEmail,
//             'password': this.state.loginPass,     
//         }
//         axios.post('/api/v1/petshare/login' , body).then(res => {
//             this.handleSuccessfulAuth(res);
//         }).catch(error => {
//             toast.error('There is some error logging you in ' + error );
//         });
//     }


//     render() {
//         const { formErrors } = this.state;

//         let initialRender
//         initialRender = (
//             <div className={`${classes.User} ${classes.SignIn}`}>
//                         <div className={classes.ImageBox}>
//                             <img className={classes.Image} src={Image1} alt={"pet1"}></img>
//                         </div>
//                         <div className={classes.FormBox}>
//                             <form>
//                                 <h2> Sign In </h2>
//                                 <input type="text" onChange={this.onUserNameLoginHandler} name="" placeholder="Username"></input>
//                                 <input type="text" onChange={this.onPasswordLoginHandler} name="" placeholder="Pawwsword"></input>
//                                 <button className={classes.Button} onClick={(e) => this.handleLogin(e)} type="submit" value="Login">Ready to Adopt? <i className="fa fa-paw" style={{fontSize: '25px'}} aria-hidden="true"></i></button>
//                                 <p className={classes.SignUp}>Don't have an account?</p> 
//                                 <button className={classes.AnchorButton} onClick={this.toggleForm}>Sign Up</button> 
//                                 <FacebookLogin handleSuccessfulAuth={this.handleSuccessfulAuth} className={classes.FaceBookButton} />
//                             </form>
//                         </div>
//                     </div>
//         )

//         if(this.state.toggleForm === true) {
//             initialRender = (
//                 <div className={`${classes.User} ${classes.SignUp}`}>
//                     <div className={classes.FormBox}>
//                         <form>
//                             <h2> Create an account </h2>
//                             <input required="required"  type="text" name="firstName" maxLength="15" noValidate onChange={this.handleChange} placeholder="First Name"></input>
//                             {formErrors.firstName.length > 0  && (
//                                 <span className="errorMessage" style={{color: 'red'}}>{formErrors.firstName}</span>
//                             )}
//                             <input required type="text" name="lastName" maxLength="15" noValidate onChange={this.handleChange} placeholder="Last Name"></input>
//                             {formErrors.firstName.length > 0 && (
//                                 <span className="errorMessage" style={{color: 'red'}}>{formErrors.lastName}</span>
//                             )}
//                             <input required type="email" name="email" noValidate onChange={this.handleChange} placeholder="Email"></input>
//                             {formErrors.firstName.length > 0  && (
//                                 <span className="errorMessage" style={{color: 'red'}}>{formErrors.email}</span>
//                             )}
//                             <input required type="password" name="password" noValidate onChange={this.handleChange} placeholder="Enter Password"></input>
//                             {formErrors.firstName.length > 0  && (
//                                 <span className="errorMessage" style={{color: 'red'}}>{formErrors.password}</span>
//                             )}
//                             <button className={classes.Button} type="submit" onClick={(e) => this.handleSignUp(e)} value="Login">I am all set<i className="fa fa-paw" style={{fontSize: '25px'}} aria-hidden="true"></i></button>
//                             <p className={classes.SignUp}>Already have an account?  </p> <button className={classes.AnchorButton} onClick={this.toggleForm}>Login </button>
//                         </form>
//                     </div>

//                     <div className={classes.ImageBox}>
//                         <img className={classes.Image} src={Image2} alt={"pet2"}></img>
//                     </div>
//                 </div> 
//             )
//         }
//         return(
//             <section className={classes.Section}>
//                 <div className={classes.Container} ref={container => this.container = container}>
                    
//                     {initialRender}
                    
//                 </div>

//                 <ToastContainer position="bottom-right"
//                     autoClose={5000}
//                     hideProgressBar={false}
//                     newestOnTop={false}
//                     closeOnClick
//                     rtl={false}
//                     pauseOnFocusLoss
//                     draggable
//                     pauseOnHover
//                 />
//             </section>
//         )
//     }
// }

// export default Auth;


