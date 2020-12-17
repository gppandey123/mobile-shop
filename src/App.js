import React, { Component } from 'react';
import {Switch , Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ProductList from './components/ProductList';
import Navbar from './components/Navbar';
import Details from './components/Details';
// import Cart from './components/Cart'; for this we restart the server and in package.json main file is  Cart.js
import Cart from './components/Cart/Cart';
import Default from './components/Default';
import Model from './components/Model';

 class App extends Component {
  render() {
    return (
     <>
     <Navbar />
     <Switch>
     <Route  exact path='/' component={ProductList} />
     <Route path='/details' component={Details} />
     <Route path='/cart'><Cart /></Route>
     <Route  component={Default } />
     </Switch>
     <Model />
      
      
      
      
     </>
     
    )
  }
}

export default App
