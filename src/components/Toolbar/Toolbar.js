import React, { Component } from 'react';
import classes from './Toolbar.module.scss';
import searchIcon from '../../assets/search.png';
import { NavLink , withRouter }  from 'react-router-dom';
import Aux from '../../hoc/Auxx';
import Logo from '../../assets/Logo.png';


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
        
        // Aos.init({duration: 1000});
        var headerDetail = this.header;
        window.addEventListener('scroll', () => {
            headerDetail.classList.toggle("sticky", window.scrollY > 0);
            if(window.scrollY > 0) {
                this.setState({
                    isSticky: true
                });
            } else if (window.scrollY === 0) {
                this.setState({
                    isSticky: false
                });
            }
        });
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
        let allHomRef =  this.props.lookForHomeRef;
        let homeRefServiceId;
        let homeRefClientId;
        let userToken = null;
        let name = '';
        let profilePic = '';
        let userNav = null;
        let fullContainer = null;
        let authOption = null;
        let seacrhBar = null;
        let imageButton = null;
        let navListHome = null;

        if(allHomRef.homeRefService.current) {
            homeRefServiceId = allHomRef.homeRefService.current.id;
        }
        if(allHomRef.homeRefClient.current) {
            homeRefClientId = allHomRef.homeRefClient.current.id;
        }

        if(this.props.userData.data) {
            userToken = this.props.userData.data.access_token;
            if(this.props.userData.data.data.name && this.props.userData.data.data.picture) {
                let shortName = this.props.userData.data.data.name.lastIndexOf(' ');
                name = this.props.userData.data.data.name.substring(0,shortName);
                profilePic = this.props.userData.data.data.picture;
            }
        }

            if(userToken === null && this.props.location.pathname === '/') {
                navListHome = (
                    <Aux>
                        {/* <a href={'#' + homeRefServiceId} >Our Services</a> */}
                        {/* <a href={'#' + homeRefServiceId} >Contact Us</a> */}
                        <NavLink style={{textDecoration: 'none'}} to={{pathname: '/auth'}}>
                        <button style={{fontSize: '16px', borderRadius: '5px' ,fontWeight:'500' ,marginRight: '25px', cursor: 'pointer' ,display:'flex', alignSelf:'center' , color: '##888888' , border: '1px solid #838383', padding: '8px 16px' ,outline: 'none' }} className={classes.YourBlogs}>Get Started</button>
                    </NavLink>
                    </Aux>
                )
            } else if (userToken !== null && this.props.location.pathname.indexOf('blogs') > -1 && this.props.location.pathname.indexOf('user') === -1)  {
                navListHome = (
                    <NavLink style={{textDecoration: 'none'}} to={{pathname: '/blogs/user'}}>
                        <button style={{fontSize: '16px', borderRadius: '5px' ,fontWeight:'500' ,marginRight: '25px', cursor: 'pointer' ,display:'flex', alignSelf:'center' , color: '##888888' , border: '1px solid #838383', padding: '8px 16px' ,outline: 'none' }} className={classes.YourBlogs}>Your Blogs</button>
                    </NavLink>
                )
            } else if(userToken !== null && this.props.location.pathname.indexOf('user') > -1) {
                navListHome = (
                    <NavLink style={{textDecoration: 'none'}} to={{pathname: '/blogs'}}>
                        <button style={{fontSize: '16px', borderRadius: '5px' ,fontWeight:'500' ,marginRight: '25px', cursor: 'pointer' ,display:'flex', alignSelf:'center' , color: '##888888' , border: '1px solid #838383', padding: '8px 16px' ,outline: 'none' }} className={classes.YourBlogs}>Blogs</button>
                    </NavLink>
                )   
            } else if(this.props.location.pathname.indexOf('auth') > -1 || this.props.location.pathname.indexOf('blogs') > -1) {
                navListHome = null
            } else {
                navListHome = (<p style={{fontSize: '18px', fontWeight:'500' ,marginRight: '20px', display:'flex', alignSelf:'center' , color: '#2D3F47' }}>Hey, {name} </p>)
            }

        if(this.props.location.pathname === '/blogs') {
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
                <Aux>
                    <NavLink style={{textDecoration: 'none'}} to={{pathname: '/blogs/user'}}>
                        <li className={classes.List} onClick={this.closeModal}><button>Your Blogs</button></li>
                    </NavLink>
                    <NavLink to={{pathname: '/auth'}}>
                        <li className={classes.List}><button onClick={this.closeModalWithLogOff}>Sign Out</button></li>
                    </NavLink>
                </Aux>
            )
            userNav = (
                <Aux>
                    {navListHome}
                    
                    {/* <Button class="ui grey basic button" style={{marginRight: '25px', cursor: 'pointer' ,display:'flex', alignSelf:'center' }}>Grey</Button> */}
                    {/* <p style={{fontSize: '18px', fontWeight:'500' ,marginRight: '5px', display:'flex', alignSelf:'center' , color: '#2D3F47' }}>Hey, {name} </p> */}
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
                <Aux>
                    {navListHome}
                    <div className={classes.Hamburger} onClick={this.openFullMenu}><div></div></div>
                </Aux>
            )
        } 

        if(this.state.showFullMenu) {
            fullContainer = (
                <div className={classes.FullMenu}> 
                    <div className={classes.Content}>
                        <ul className={classes.PageMenu}>
                            <NavLink to={{pathname: '/'}}>
                                <li className={classes.List} onClick={this.closeModal}><button>Home</button></li>
                            </NavLink>
                            <li className={classes.List}><button>Adopt a Pet</button></li>
                            <NavLink to={{pathname: '/blogs'}}>
                                <li className={classes.List} onClick={this.closeModal}><button>Blogs</button></li>
                            </NavLink>
                            {authOption}
                            <a href={'#' + homeRefServiceId}> <li className={classes.List} onClick={this.closeModal} ><button>Services</button></li> </a>
                        </ul>
                    </div>
                    <button onClick={this.closeModal} className={classes.ModalClose}>X</button>
                </div>
            )
        } else {
            fullContainer = (
                <header className={this.state.isSticky ? classes.sticky : ''} ref={header => this.header = header}> 
                    <NavLink style={{textDecoration: 'none'}}  to={{pathname: '/'}}>
                        <img src={Logo} alt={"Logo"} className={classes.Logo}></img>
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