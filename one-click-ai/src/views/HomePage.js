import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import NavBar from './utils/NavBar';
import HomeCards from './pages/HomeCards';
import Nlp from './pages/Nlp';
import AR from './pages/AR';


export class HomePage extends Component {

    render() {
        return (
            <Router>
                <NavBar />
                <Switch>
                    <Route path="/" component={HomeCards} exact />
                    <Route path="/nlp" component={Nlp} />
                    <Route path="/ar" component={AR} />
                </Switch>
            </Router>
        )
    }
}

export default HomePage
