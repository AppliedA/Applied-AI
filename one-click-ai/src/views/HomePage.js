import React, { Component } from 'react';
import {
    Switch,
    Route
} from "react-router-dom";

import NavBar from './utils/NavBar';
import HomeCards from './pages/HomeCards';
import AdsMOL from './pages/AdsMOL';
import AutoAttendance from './pages/AutoAttendance';
import DisasterPrediction from './pages/DisasterPrediction';
import FaceMask from './pages/FaceMask';
import ObjectDetection from './pages/ObjectDetection';
import ProductDefect from './pages/ProductDefect';
import Sentiment from  './pages/Sentiment';
import ImageCaptioning from './pages/ImageCaptioning';
import RealtimeObjPloat from './pages/RealtimeObjPloat';
import Maskingobj from './pages/Maskingobj';
import Alexa from './pages/Alexa';
import Car from './pages/Car';
import Security from './pages/Security';
import Recommendation from './pages/Recommendation';
import CarPrice from './pages/CarPrice';
import DrugEffectiveness from './pages/DrugEffectiveness';
export class HomePage extends Component {

    render() {
        return (
            <>
                <NavBar />
                <Switch>
                    <Route path="/" component={HomeCards} exact />
                    <Route path="/nlp" component={Sentiment} />
                    <Route path="/nlp-2" component={ImageCaptioning} />
                    <Route path="/ar" component={RealtimeObjPloat} />
                    <Route path="/ar-2" component={Maskingobj} />
                    <Route path="/disaster-prediction" component={DisasterPrediction}/>
                    <Route path="/product-defect-prediction" component={ProductDefect}/>
                    <Route path="/automatic-attendance" component={AutoAttendance}/>
                    <Route path="/alexa" component={Alexa}/>
                    <Route path="/car" component={Car}/>
                    <Route path="/security" component={Security}/>
                    <Route path="/face-mask-detection" component={FaceMask}/>
                    <Route path="/object-detection" component={ObjectDetection}/>
                    <Route path="/targeted-ads" component={AdsMOL}/>
                    <Route path="/book-movie" component={Recommendation}/>
                    <Route path="/car-price" component={CarPrice}/>
                    <Route path="/drug" component={DrugEffectiveness}/>
                </Switch>
            </>
        )
    }
}

export default HomePage
