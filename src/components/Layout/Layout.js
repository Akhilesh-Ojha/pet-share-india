import React, { Component } from 'react';
import classes from './Layout.module.scss';
import { Switch , Route } from 'react-router';
import Blogs from '../../containers/Blogs/Blogs';
import Auth from '../../containers/Auth/Auth';
import Navbar from '../Navbar/Navbar';
import Home from '../../containers/Home/Home';
import Adopt from '../../containers/Adopt/Adopt';
import axios from '../../axios';
import { withRouter }  from 'react-router-dom';
import PutUpForAdoption from '../../containers/PutUpForAdoption/PutUpForAdoption';

class Layout extends Component {

    constructor(props) {
        super(props);
        this.homeRefService = React.createRef();
        this.homeRefClient = React.createRef();
        this.homeRefMainSection = React.createRef();
        this.state = {
            loggedInStatus: "Not_Logged_In",
            user: {},
            accessToken: sessionStorage.getItem('accessToken') ? sessionStorage.getItem('accessToken') : ''
        }
    }

    handleLogin = (response) => {
        console.log('response in handle Login', response);
        sessionStorage.setItem('accessToken', response.data.accessToken);
        this.setState({
            loggedInStatus: 'Logged In',
            user: response,
            accessToken: response.data.accessToken
        })
    }
    
    handleLogout = () => {
        this.setState({
            loggedInStatus: "Not_Logged_In",
            user: {},
            accessToken: ''
        });
    }

    checkLoginStatus = () => {
        let accessToken = sessionStorage.getItem('accessToken');
        if(accessToken) {
            axios.get('/api/v1/token?accessToken=' + accessToken ).then(response => {
                if(response.data.isValid === true) {
                    this.setState({
                        loggedInStatus: 'Logged In',
                        user: response,
                        accessToken: response.data.accessToken
                    });
                } else {
                    this.setState({
                        loggedInStatus: 'Not_Logged_In'
                    });
                }
            });
        } else {
            this.setState({
                loggedInStatus: 'Not_Logged_In'
            });
        }
    }

    componentDidMount() {
        this.checkLoginStatus();
        // console.log('PROPSSS', this.props);
    }

    render() {
        console.log('THIS>STATE', this.state);
        let pathName = this.props.location.pathname;
            
        let toolBar = (
            <Navbar isLoggedIn={this.state.loggedInStatus} lookForHomeRef={{homeRefService: this.homeRefService, homeRefClient: this.homeRefClient }}  handleLogout={this.handleLogout} userData={this.state.user} />
        )
        if(pathName === '/blogs/new-blog' || pathName.indexOf('/edit') > -1 || pathName.indexOf('put-up-for-adoption') > -1) {
            toolBar = null
        }
        return(
            <div className={classes.Container}>
                {toolBar}
                <main className={classes.Content}>
                    <Switch>
                        <Route
                            path={"/"}
                            exact
                            render={ props => (
                                <Home ref={{homeRefService: this.homeRefService, homeRefClient: this.homeRefClient, homeRefMainSection: this.homeRefMainSection }} {...props} loggedInStatus={this.state.loggedInStatus} />
                            )}
                        />
                        <Route
                            path={"/blogs"}
                            render={ props => (
                                <Blogs {...props} loggedInStatus={this.state.loggedInStatus} accessToken={this.state.accessToken}/>
                            )}
                        />
                        <Route 
                            path={"/auth"} 
                            exact
                            render={ props => (
                            <Auth {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
                            )}
                        />

                        <Route 
                            path={"/adopt"} 
                            exact
                            render={ props => (
                                <Adopt {...props} accessToken={this.state.accessToken}/>
                            )}
                        />
                        <Route 
                            path={"/put-up-for-adoption"} 
                            exact
                            render={ props => (
                                <PutUpForAdoption {...props} accessToken={this.state.accessToken}/>
                            )}
                        />
                    </Switch>
                </main>
            </div>
        );
    }
    
}

export default withRouter(Layout);