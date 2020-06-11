import React, { Component } from 'react';
import classes from './Layout.module.scss';
import Toolbar from '../../components/Toolbar/Toolbar';
import Pets from '../../containers/Pets/Pets';
import FullPetDetails from '../FullPetDetails/FullPetDetails';
import NewPetBlog from '../NewPetBlog/NewPetBlog';
import EditPetDetails from '../EditPetDetails/EditPetDetails';
import { Route , Switch}  from 'react-router-dom';
import Auth from '../Auth/Auth';
class Layout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedInStatus: "Not_Logged_In",
            user: {}
        }
    }

    handleLogin = (response) => {
        this.setState({
            loggedInStatus: 'Logged In',
            user: response
        })
    }

    render() {
        console.log('this.stae in layout', this.state);
        return(
            <div className={classes.Container}>
                <Toolbar isLoggedIn={this.state.loggedInStatus} userData={this.state.user} />
                <Switch>
                        <Route
                         path={"/"}
                         exact
                         render={ props => (
                             <Pets {...props} loggedInStatus={this.state.loggedInStatus} />
                         )}
                         />
                        <Route 
                          path={"/auth"} 
                          exact
                          render={ props => (
                            <Auth {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
                          )}
                        />
                        <Route path="/new-blog" exact component={NewPetBlog}/>
                        <Route path="/:id" exact  component={FullPetDetails}/>
                        <Route path="/:id/edit" exact  component={EditPetDetails}/>
                </Switch>
            </div>
        );
    }
    
}

export default Layout;