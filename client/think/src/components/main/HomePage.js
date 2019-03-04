import React, { Component } from 'react';
import './Home.scss';

import background_item from '../../assets/images/home_page/background_item.png';
import card_background from '../../assets/images/home_page/background.png';
import ai_painter from '../../assets/images/home_page/ai_painter.jpg';

import $ from 'jquery';

import ArtsGenerator from './generator/ArtsGenerator';

class HomePage extends Component {
  
  onMouseMove = (e) => {
    let card = $(".card"); 
    let ax = -($(window).innerWidth()/2- e.pageX)/20;
    let ay = ($(window).innerHeight()/2- e.pageY)/10;
    card.attr("style", "transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-webkit-transform: rotateY("+ax+"deg) rotateX("+ay+"deg);-moz-transform: rotateY("+ax+"deg) rotateX("+ay+"deg)");
  }

  render() {
    return (
      <div className="page" id="fullpage">
        <div className="page-section page-section-home-background" id="1" onMouseMove={ this.onMouseMove }>
          <div className="page-section-home">
            <div className="home-content">
              <div className="background-item">
                <img src={background_item} alt=""></img>
              </div>
              <div className="card">
                <div className="card-content">
                  <img className="card-position img-content" src={card_background} alt=""></img>
                  <img className="card-position img" src={ai_painter} alt=""></img>
                </div>
              </div>
              <div className="text">
                <span className="text-content">CAN AI <span className="theme">T</span>HINK<span className="theme">.</span> CREATIVELY</span>
              </div>
            </div>
          </div>
        </div>
        <div className="page-section section page-section-generator-background" id="2">
          <div className="page-section-generator">
            <ArtsGenerator></ArtsGenerator>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;


