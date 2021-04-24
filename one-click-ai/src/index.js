import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import HomePage from './views/HomePage';
import './assets/css/main.css';
import { BrowserRouter as Router } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/storage';
import { firebaseConfig } from './config/config';
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <HomePage />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
