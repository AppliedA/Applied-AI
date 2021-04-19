import React, { Component } from 'react';
import {
    Switch,
    Route
} from "react-router-dom";

import NavBar from './utils/NavBar';
import HomeCards from './pages/HomeCards';
import Nlp from './pages/Nlp';
import AR from './pages/AR';
import AdsMOL from './pages/AdsMOL';
import AutoAttendance from './pages/AutoAttendance';
import DisasterPrediction from './pages/DisasterPrediction';
import FaceMask from './pages/FaceMask';
import IOT from './pages/IOT';
import ObjectDetection from './pages/ObjectDetection';
import ProductDefect from './pages/ProductDefect';

export class HomePage extends Component {

    render() {
        return (
            <>
                <NavBar />
                <Switch>
                    <Route path="/" component={HomeCards} exact />
                    <Route path="/nlp" component={Nlp} />
                    <Route path="/ar" component={AR} />
                    <Route path="/object-detection" component={ObjectDetection}/>
                    <Route path="/disaster-prediction" component={DisasterPrediction}/>
                    <Route path="/product-defect-prediction" component={ProductDefect}/>
                    <Route path="/automatic-attendance" component={AutoAttendance}/>
                    <Route path="/iot" component={IOT}/>
                    <Route path="/face-mask-detection" component={FaceMask}/>
                    <Route path="/targeted-ads" component={AdsMOL}/>
                </Switch>
            </>
        )
    }
}

export default HomePage
