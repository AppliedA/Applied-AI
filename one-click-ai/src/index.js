import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import HomePage from './views/HomePage';
import './assets/css/main.css'
import { BrowserRouter as Router, } from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <HomePage />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
