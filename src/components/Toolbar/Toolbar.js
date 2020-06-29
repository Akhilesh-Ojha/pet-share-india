import React, { Component } from 'react';
import classes from './Toolbar.module.scss';
import searchIcon from '../../assets/search.png';
import { NavLink , withRouter }  from 'react-router-dom';
import Aux from '../../hoc/Auxx';

class Toolbar extends Component {

    constructor(props) {
        super(props);
        this.dropDownStyle = null;
        this.state = {
            value: '',
            isSticky: false, 
            showDropDown: true,
            showFullMenu: false,
            isOnHomePage: false
        }

    }

    componentDidMount() {
        // var headerDetail = this.header;
        // window.addEventListener('scroll', () => {
        //     headerDetail.classList.toggle("sticky", window.scrollY > 0);
        //     if(window.scrollY > 0) {
        //         this.setState({
        //             isSticky: true
        //         });
        //     } else if (window.scrollY === 0) {
        //         this.setState({
        //             isSticky: false
        //         });
        //     }
        // });
    }

    onInptChangeHandler = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    openFullMenu = () => {
        this.setState({
            showFullMenu: true
        })
    }

    closeModal = () => {
        this.setState({
            showFullMenu: false
        })
    }

    closeModalWithLogOff = () => {
        sessionStorage.clear();
        this.props.handleLogout();
        this.setState({
            showFullMenu: false
        })
    }

    render () {
        console.log('Props in toolbar', this.props);
        console.log('window', window.location.pathname);
        let userToken = null;
        let name = '';
        let profilePic = '';
        if(this.props.userData.data) {

            userToken = this.props.userData.data.access_token;

            if(this.props.userData.data.data.name && this.props.userData.data.data.picture) {
                
                let shortName = this.props.userData.data.data.name.lastIndexOf(' ');
                name = this.props.userData.data.data.name.substring(0,shortName);
        
                profilePic = this.props.userData.data.data.picture.data.url;
            }
    
        }

        let userNav = null;
        let fullContainer = null;
        let authOption = null;
        let seacrhBar = null;
        let imageButton = null;

        if(false) {
            seacrhBar = (
                <Aux>
                    <input placeholder="Search" type="text" className={classes.Search__Input} value={this.state.value} onChange={this.onInptChangeHandler} ></input>
                    <button className={classes.Search__Button}>
                    <img src={searchIcon} alt={""} className={classes.Search__Icon}></img>
                    </button>
                </Aux>
            )
        } else {
            seacrhBar = null
        }

        if(profilePic === '') {
            imageButton = (
                <button onClick={this.openFullMenu}  className={classes.ButtonWithoutPic}><i className="fa fa-user-circle" style={{color: '#5a5757'}} aria-hidden="true"></i></button>
            )
        } else {
            imageButton = (
                <button className={classes.Image__Button} onClick={this.openFullMenu} >
                            <img src={profilePic} alt={""} className={classes.Image}></img>
                </button>
            )
        }

        if(userToken !== null) {
            authOption = (
                <NavLink to={{pathname: '/auth'}}>
                    <li className={classes.List}><button onClick={this.closeModalWithLogOff}>Sign Out</button></li>
                </NavLink>
            )
            userNav=(
                <Aux>
                    <p style={{fontSize: '20px', fontWeight:'500' ,marginRight: '5px', display:'flex', alignSelf:'center' , color: 'rgba(223,204,153, 1)' }}>Hey, {name} </p>
                    <div style={{display: 'flex' , flexDirection: "column"}}>
                        {imageButton}
                    </div>
                </Aux>
            )
        } else  {
            authOption = (
                <NavLink to={{pathname: '/auth'}}>
                    <li className={classes.List}><button onClick={this.closeModal}>Sign In</button></li>
                </NavLink>
            )
            userNav = (
                <div className={classes.Hamburger} onClick={this.openFullMenu}><div></div></div>
            )
        } 

        if(this.state.showFullMenu) {
            fullContainer = (
                <div className={classes.FullMenu}> 
                    <div className={classes.Content}>
                        <ul className={classes.PageMenu}>
                            <NavLink to={{pathname: '/'}}>
                                <li className={classes.List}><button>Home</button></li>
                            </NavLink>
                            <li className={classes.List}><button>Your Post</button></li>
                            <li className={classes.List}><button>Adopt a Pet</button></li>
                            {authOption}
                            <li className={classes.List}><button>Contact Us</button></li>
                        </ul>
                    </div>
                    <button onClick={this.closeModal} className={classes.ModalClose}>X</button>
                </div>
            )
        } else {
            fullContainer = (
                // <header className={(this.state.isSticky && window.location.pathname !== '/') ? classes.sticky : ''} ref={header => this.header = header}> 
                <header ref={header => this.header = header}> 
                    <NavLink style={{textDecoration: 'none'}}  to={{pathname: '/'}}>
                        {/* <img src={Logo} alt={"Logo"} className={classes.Logo}></img> */}
                        <div style={{fontSize: '20px' , marginLeft:'10px', textDecoration: 'underline', color: 'rgb(223,204,153)'  , fontWeight: 'bold'}}>𝓟𝓮𝓽 𝓢𝓱𝓪𝓻𝓮</div>
                    </NavLink>
                
                    <div className={classes.Search}>
                        {seacrhBar}
                    </div>

                    <div className={classes.UserNav}>
                        {userNav}
                        
                    </div>
                </header>

            )
        }

        return(
            <Aux>
                {fullContainer}
            </Aux>
        );
    }
    
}

export default withRouter(Toolbar);






















// {/* <div className={classes.Menu}></div>
// {/* <div> */}
//     <div className={classes.Content}>
//         <ul className={classes.PageMenu}>
//             <li className={classes.List}><button>Blog Post</button></li>
//             <li className={classes.List}><button>Adopt a Pet</button></li>
//             <li className={classes.List}><button>Sign In</button></li>
//             <li className={classes.List}><button>Contact Us</button></li>

//             {/* <li className={classes.Social}>
//                 <button><i class="fa fa-facebook" aria-hidden="true"></i></button>
//                 <button><i class="fa fa-instagram" aria-hidden="true"></i></button>
//             </li> */}
//             {/* <li className={classes.Social}></li> */}
//         </ul>
//     </div>
// {/* </div> */}

// <button onClick={this.closeModal} className={classes.ModalClose}>X</button> */}