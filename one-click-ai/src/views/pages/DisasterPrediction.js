import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Title from '../utils/Title'
import Description from '../utils/Description';
import Yt from '../utils/Yt';
import 'bootstrap/dist/css/bootstrap.min.css';
import SmallTitle from '../utils/SmallTitle';
import { GoMarkGithub } from "react-icons/go";

export class DisasterPrediction extends Component {
    constructor() {
        super();
        this.title1 = "Auto Attendance";
        this.title2 = "Working Demo of Project";
        this.smalltitle1 = "Deep learning";
        this.smalltitle2 = "Auto Attendance";
        this.githublink = "#";
        this.description = "Lorem ipsum dolor dsfsd sdf fd gf fg fg  sdf sds r trag tagr gtye sit amet, consectetur Lorem ipsum dolor dsfsd sdf fd gf fg fg  sdf sds r trag tagr gtye sit amet, consectetur  Lorem ipsum dolor dsfsd sdf fd gf fg fg  sdf sds r trag tagr gtye sit amet, consectetur  adipiscing elit. Phasellus ullamcorper tortor elementum massa posuere, id pretium est eleifend. Donec eu eros sed nibh lobortis facilisis. In mollis odio laoreet ipsum lacinia rutrum. Cras nulla massa, gravida sagittis pulvinar sed, faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    }
    
    render() {
        let style = {
            "width":"100%"
        }
        let iconsize = {
            "height": "50px",
            "width" : "50px"
        }
        return (
            <div className="card-wrapper">
                <Helmet>
                    <title>Targeted Ads Based on Gender/Age</title>
                </Helmet>
                <div style={{ width: "100%" }} className="flex flex-col justify-center items-center">
                    <Title title={this.title1} />
                    <SmallTitle title={this.smalltitle1}/>
                    <br/>
                    <br/>
                    <div className="row">
                        <div className="col-7 d-flex justify-content-center text-center"><Description desc={this.description} /></div>
                        <div className="col-4 justify-content-center text-center"><img style={style} className="desc-img" src="https://picsum.photos/400/300" alt={this.title} /></div>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <Title title={this.title2} />
                    <SmallTitle title={this.smalltitle2}/>
                    <br/>
                    <Yt src="https://www.youtube.com/embed/VpF6ajh59fI" title="AdsMol Video" />
                    <br/>
                    <a href={this.githublink}><GoMarkGithub style={iconsize}/></a>
                </div>
            </div>
        )
    }
}

export default DisasterPrediction;