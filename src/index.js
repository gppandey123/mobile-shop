import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ProductProvider } from './components/store/Context';
import { BrowserRouter } from 'react-router-dom';



ReactDOM.render(
  <ProductProvider>
    <BrowserRouter>
    <App />
    </ BrowserRouter>
  </ProductProvider>
  ,
  document.getElementById('root')
);


