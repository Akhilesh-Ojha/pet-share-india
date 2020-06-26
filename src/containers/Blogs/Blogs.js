import React, { Component } from 'react';
import { Route , Switch}  from 'react-router-dom';
import NewPetBlog from '../../containers/Blogs/NewPetBlog/NewPetBlog';
import Pets from '../../containers/Blogs/Pets/Pets';
import FullPetDetails from '../../containers/Blogs/FullPetDetails/FullPetDetails';
import EditPetDetails from '../../containers/Blogs/EditPetDetails/EditPetDetails';


class Blogs extends Component {
    render () {
        console.log('Props', this.props);
        return (
            <div>
                <Switch>
                    <Route path="/blogs" exact component={Pets} />
                    <Route path="/blogs/new-blog" exact component={NewPetBlog}/>
                    <Route path="/blogs/:id" exact component={FullPetDetails}/>
                    <Route path="/blogs/:id/edit" exact  component={EditPetDetails}/>
                </Switch>
            </div>
        );
    }
}

export default Blogs;