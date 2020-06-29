import React, { Component } from 'react';
import { Route , Switch}  from 'react-router-dom';
import NewPetBlog from '../../containers/Blogs/NewPetBlog/NewPetBlog';
import Pets from '../../containers/Blogs/Pets/Pets';
import FullPetDetails from '../../containers/Blogs/FullPetDetails/FullPetDetails';
import EditPetDetails from '../../containers/Blogs/EditPetDetails/EditPetDetails';
import BlogsByUser from '../../containers/Blogs/BlogsByUser/BlogsByUser';


class Blogs extends Component {
    render () {
        return (
            <div>
                <Switch>
                    {/* <Route path="/blogs" exact component={Pets} /> */}

                    <Route
                            path={"/blogs"}
                            exact
                            render={ props => (
                                <Pets {...props} accessToken={this.props.accessToken}/>
                            )}
                    />

                    <Route
                            path={"/blogs/user"}
                            exact
                            render={ props => (
                                <BlogsByUser {...props} accessToken={this.props.accessToken}/>
                            )}
                    />

                    <Route
                            path={"/blogs/new-blog"}
                            exact
                            render={ props => (
                                <NewPetBlog {...props} accessToken={this.props.accessToken}/>
                            )}
                    />
                    {/* <Route path="/blogs/new-blog" exact component={NewPetBlog}/> */}

                    <Route
                            path={"/blogs/:id"}
                            exact
                            render={ props => (
                                <FullPetDetails {...props} accessToken={this.props.accessToken}/>
                            )}
                    />
                    {/* <Route path="/blogs/:id" exact component={FullPetDetails}/> */}

                    <Route
                            path={"/blogs/:id/edit"}
                            exact
                            render={ props => (
                                <EditPetDetails {...props} accessToken={this.props.accessToken}/>
                            )}
                    />
                    {/* <Route path="/blogs/:id/edit" exact  component={EditPetDetails}/> */}
                </Switch>
            </div>
        );
    }
}

export default Blogs;