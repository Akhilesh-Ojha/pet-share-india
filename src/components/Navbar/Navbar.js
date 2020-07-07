import React, { Component } from 'react';
import './Navbar.scss';
import searchIcon from '../../assets/search.png';
import { NavLink , withRouter }  from 'react-router-dom';
import Aux from '../../hoc/Auxx';
import Logo from '../../assets/Logo.png';


class Navbar extends Component {

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
            // console.log('Hereeee', this.props.userData.data.data.name);
            userToken = this.props.userData.data.access_token;
            if(this.props.userData.data.data.name) {
                let shortName = this.props.userData.data.data.name.lastIndexOf(' ');
                name = this.props.userData.data.data.name.substring(0,shortName);
                
            }
            if(this.props.userData.data.data.picture) {
                profilePic = this.props.userData.data.data.picture;
            }
        }

            if(userToken === null && this.props.location.pathname === '/') {
                navListHome = (
                    <Aux>
                        {/* <a href={'#' + homeRefServiceId} >Our Services</a> */}
                        {/* <a href={'#' + homeRefServiceId} >Contact Us</a> */}
                        <NavLink style={{textDecoration: 'none'}} to={{pathname: '/auth'}}>
                        <button style={{fontSize: '16px', borderRadius: '5px' ,fontWeight:'500' ,marginRight: '25px', cursor: 'pointer' ,display:'flex', alignSelf:'center' , color: '##888888' , border: '1px solid #838383', backgroundColor:'transparent' ,padding: '8px 16px' ,outline: 'none' }} className="YourBlogs">Get Started</button>

                        {/* <button style={{fontSize: '16px', borderRadius: '5px' ,fontWeight:'500' ,marginRight: '25px', cursor: 'pointer' ,display:'flex', alignSelf:'center' ,backgroundImage: 'linear-gradient( to right bottom, #FF6975 , #F8B5BB)' , color: '##888888' , border: 'none', padding: '8px 16px' ,outline: 'none' }} className="YourBlogs}>Get Started</button> */}
                    </NavLink>
                    </Aux>
                )
            } else if (userToken !== null && this.props.location.pathname.indexOf('blogs') > -1 && this.props.location.pathname.indexOf('user') === -1)  {
                navListHome = (
                    <NavLink style={{textDecoration: 'none'}} to={{pathname: '/blogs/user'}}>
                        <button style={{fontSize: '16px', borderRadius: '5px' ,fontWeight:'500' ,marginRight: '25px', cursor: 'pointer' ,display:'flex', alignSelf:'center' , color: '##888888' , border: '1px solid #838383', padding: '8px 16px' ,outline: 'none' }} className="YourBlogs">Your Blogs</button>
                    </NavLink>
                )
            } else if(userToken !== null && this.props.location.pathname.indexOf('user') > -1) {
                navListHome = (
                    <NavLink style={{textDecoration: 'none'}} to={{pathname: '/blogs'}}>
                        <button style={{fontSize: '16px', borderRadius: '5px' ,fontWeight:'500' ,marginRight: '25px', cursor: 'pointer' ,display:'flex', alignSelf:'center' , color: '##888888' , border: '1px solid #838383', padding: '8px 16px' ,outline: 'none' }} className="YourBlogs">Blogs</button>
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
                    <input placeholder="Search" type="text" className="Search__Input" value={this.state.value} onChange={this.onInptChangeHandler} ></input>
                    <button className="Search__Button">
                    <img src={searchIcon} alt={""} className="Search__Icon"></img>
                    </button>
                </Aux>
            )
        } else {
            seacrhBar = null
        }

        if(profilePic === '') {
            imageButton = (
                <button onClick={this.openFullMenu}  className="ButtonWithoutPic"><i className="fa fa-user-circle" style={{color: '#5a5757'}} aria-hidden="true"></i></button>
            )
        } else {
            imageButton = (
                <button className="Image__Button" onClick={this.openFullMenu} >
                            <img src={profilePic} alt={""} className="Image"></img>
                </button>
            )
        }

        if(userToken !== null) {
            authOption = (
                <Aux>
                    <NavLink style={{textDecoration: 'none'}} to={{pathname: '/blogs/user'}}>
                        <li className="List" onClick={this.closeModal}><button>Your Blogs</button></li>
                    </NavLink>
                    <NavLink to={{pathname: '/auth'}}>
                        <li className="List"><button onClick={this.closeModalWithLogOff}>Sign Out</button></li>
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
                    <li className="List"><button onClick={this.closeModal}>Sign In</button></li>
                </NavLink>
            )
            userNav = (
                <Aux>
                    {navListHome}
                    <div className="Hamburger" onClick={this.openFullMenu}><div></div></div>
                </Aux>
            )
        } 

        if(this.state.showFullMenu) {
            fullContainer = (
                <div className="FullMenu"> 
                    <div className="Content">
                        <ul className="PageMenu">
                            <NavLink to={{pathname: '/'}}>
                                <li className="List" onClick={this.closeModal}><button>Home</button></li>
                            </NavLink>
                            <li className="List"><button>Adopt a Pet</button></li>
                            <NavLink to={{pathname: '/blogs'}}>
                                <li className="List" onClick={this.closeModal}><button>Blogs</button></li>
                            </NavLink>
                            {authOption}
                            <a href={'#' + homeRefServiceId}> <li className="List" onClick={this.closeModal} ><button>Services</button></li> </a>
                        </ul>
                    </div>
                    <button onClick={this.closeModal} className="ModalClose">X</button>
                </div>
            )
        } else {
            fullContainer = (
                <header className="this.state.isSticky ? sticky : ''" ref={header => this.header = header}> 
                    <NavLink style={{textDecoration: 'none'}}  to={{pathname: '/'}}>
                        <img src={Logo} alt={"Logo"} className="Logo"></img>
                    </NavLink>
                    <div className="Search">
                        {seacrhBar}
                    </div>
                    <div className="UserNav">
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

export default withRouter(Navbar);






















// {/* <div className="Menu}></div>
// {/* <div> */}
//     <div className="Content}>
//         <ul className="PageMenu}>
//             <li className="List}><button>Blog Post</button></li>
//             <li className="List}><button>Adopt a Pet</button></li>
//             <li className="List}><button>Sign In</button></li>
//             <li className="List}><button>Contact Us</button></li>

//             {/* <li className="Social}>
//                 <button><i class="fa fa-facebook" aria-hidden="true"></i></button>
//                 <button><i class="fa fa-instagram" aria-hidden="true"></i></button>
//             </li> */}
//             {/* <li className="Social}></li> */}
//         </ul>
//     </div>
// {/* </div> */}

// <button onClick={this.closeModal} className="ModalClose}>X</button> */}