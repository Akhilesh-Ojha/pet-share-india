import React , {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Blogs from './containers/Blogs/Blogs'
import Auth from './containers/Auth/Auth';

class App extends Component  {  
  render() {
    return (
      <BrowserRouter>
          <Layout> 
            <Blogs></Blogs>
          </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
