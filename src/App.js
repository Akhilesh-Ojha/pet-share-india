import React , {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';

class App extends Component  {  
  render() {
    return (
      <BrowserRouter>
          <Layout> 
          </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
