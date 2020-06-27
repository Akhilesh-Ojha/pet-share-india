import React, { Component } from 'react';
import classes from './Layout.module.scss';
import { Switch , Route } from 'react-router';
import Blogs from '../../containers/Blogs/Blogs';
import Auth from '../../containers/Auth/Auth';
import Toolbar from '../../components/Toolbar/Toolbar';
import Home from '../../containers/Home/Home';
import axios from '../../axios';

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedInStatus: "Not_Logged_In",
            user: {},
            accessToken: ''
        }
    }

    handleLogin = (response) => {
        sessionStorage.setItem('accessToken', response.data.access_token);
        this.setState({
            loggedInStatus: 'Logged In',
            user: response,
            accessToken: response.data.access_token
        })
    }

    checkLoginStatus = () => {
        let accessToken = sessionStorage.getItem('accessToken');
        axios.get('/api/v1/token?access_token=' + accessToken).then(response => {
            if(response.data.is_valid === true) {
                this.setState({
                    loggedInStatus: 'Logged In',
                    user: response,
                    accessToken: accessToken
                })
            }
        });
    }

    componentDidMount() {
        this.checkLoginStatus();
    }

    render() {
        return(
            <div className={classes.Container}>
                <Toolbar isLoggedIn={this.state.loggedInStatus} userData={this.state.user} />
                <main className={classes.Content}>
                    <Switch>
                        <Route
                            path={"/"}
                            exact
                            render={ props => (
                                <Home {...props} loggedInStatus={this.state.loggedInStatus} />
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
                    </Switch>
                </main>
            </div>
        );
    }
    
}

export default Layout;