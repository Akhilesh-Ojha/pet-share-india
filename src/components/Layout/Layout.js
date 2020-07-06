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

class Layout extends Component {

    constructor(props) {
        super(props);
        this.homeRefService = React.createRef();
        this.homeRefClient = React.createRef();
        this.state = {
            loggedInStatus: "Not_Logged_In",
            user: {},
            accessToken: sessionStorage.getItem('accessToken') ? sessionStorage.getItem('accessToken') : ''
        }
    }

    handleLogin = (response) => {
        console.log('response in handle Login', response);
        sessionStorage.setItem('accessToken', response.data.access_token);
        this.setState({
            loggedInStatus: 'Logged In',
            user: response,
            accessToken: response.data.access_token
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
            axios.get('/api/v1/token?access_token=' + accessToken).then(response => {
                console.log("RESP", response);
                if(response.data.is_valid === true) {
                    this.setState({
                        loggedInStatus: 'Logged In',
                        user: response,
                        accessToken: response.data.access_token
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

        console.log('THIS>HOMEEF', {homeRefService: this.homeRefService, homeRefClient: this.homeRefClient } );

        let pathName = this.props.location.pathname;
            
        let toolBar = (
            <Navbar isLoggedIn={this.state.loggedInStatus} lookForHomeRef={{homeRefService: this.homeRefService, homeRefClient: this.homeRefClient }}  handleLogout={this.handleLogout} userData={this.state.user} />
        )
        if(pathName === '/blogs/new-blog' || pathName.indexOf('/edit') > -1) {
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
                                <Home ref={{homeRefService: this.homeRefService, homeRefClient: this.homeRefClient }} {...props} loggedInStatus={this.state.loggedInStatus} />
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
                    </Switch>
                </main>
            </div>
        );
    }
    
}

export default withRouter(Layout);