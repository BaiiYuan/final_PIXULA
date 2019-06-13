import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'

import {
  IMAGES_QUERY, LOGIN_QUERY 
} from '../../graphql'

import "../css/style.css" 


class App extends Component {
  state = {
    formTitle: '',
    formBody: '',
    authorId: 1
  }

 
  render() {
    return (
      <body>
		
      {/*<div class="fh5co-loader"></div>*/}
      
      <nav class="fh5co-nav" role="navigation">
        <div class="top-menu">
          <div class="container">
            <div class="row">
              <div class="col-xs-2">
                <div id="fh5co-logo"><a href="index.html">Baiyuan<span>.</span></a></div>
              </div>
              <div class="col-xs-10 text-right menu-1">
                <ul>
                  <li class="active"><a href="index.html">Home</a></li>
                  <li><a href="portfolio.html">Portfolio</a></li>
                  <li class="btn-cta"><a href="#"><span>Login</span></a></li>
                </ul>
              </div>
            </div>
            
          </div>
        </div>
      </nav>
    
      <header id="fh5co-header" class="fh5co-cover js-fullheight" role="banner">
        <div class="container">
            <div class="col-md-8 col-md-offset-2 text-center">
              <div class="display-t js-fullheight">
                <div class="display-tc js-fullheight animate-box" data-animate-effect="fadeIn">
                  <h1>Creativity Is A Wild Mind &amp; A Disciplined Eye</h1>
                  <p><a class="btn btn-primary btn-lg btn-demo" href="#"> View Demo</a> <a class="btn btn-primary btn-lg btn-learn">Learn More</a></p>
                </div>
              </div>
            </div>
        </div>
      </header>
    
      <div id="fh5co-features">
        <div class="container">
          <div class="services-padding">
            <div class="row">
              <div class="col-md-4 animate-box">
                <div class="feature-left">
                  <span class="icon">
                    <i class="icon-hotairballoon"></i>
                  </span>
                  <div class="feature-copy">
                    <h3>Marketing</h3>
                    <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit.</p>
                    <p><a href="#">Learn More <i class="icon-arrow-right22"></i></a></p>
                  </div>
                </div>
              </div>
    
              <div class="col-md-4 animate-box">
                <div class="feature-left">
                  <span class="icon">
                    <i class="icon-search"></i>
                  </span>
                  <div class="feature-copy">
                    <h3>Search Engine</h3>
                    <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit.</p>
                    <p><a href="#">Learn More <i class="icon-arrow-right22"></i></a></p>
                  </div>
                </div>
    
              </div>
              <div class="col-md-4 animate-box">
                <div class="feature-left">
                  <span class="icon">
                    <i class="icon-wallet"></i>
                  </span>
                  <div class="feature-copy">
                    <h3>Earn Money</h3>
                    <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit.</p>
                    <p><a href="#">Learn More <i class="icon-arrow-right22"></i></a></p>
                  </div>
                </div>
              </div>
            </div>
    
    
            <div class="row">
              <div class="col-md-4 animate-box">
    
                <div class="feature-left">
                  <span class="icon">
                    <i class="icon-wine"></i>
                  </span>
                  <div class="feature-copy">
                    <h3>Entrepreneur</h3>
                    <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit.</p>
                    <p><a href="#">Learn More <i class="icon-arrow-right22"></i></a></p>
                  </div>
                </div>
    
              </div>
    
              <div class="col-md-4 animate-box">
                <div class="feature-left">
                  <span class="icon">
                    <i class="icon-genius"></i>
                  </span>
                  <div class="feature-copy">
                    <h3>Stragic Plan</h3>
                    <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit.</p>
                    <p><a href="#">Learn More <i class="icon-arrow-right22"></i></a></p>
                  </div>
                </div>
    
              </div>
              <div class="col-md-4 animate-box">
                <div class="feature-left">
                  <span class="icon">
                    <i class="icon-chat"></i>
                  </span>
                  <div class="feature-copy">
                    <h3>Support</h3>
                    <p>Facilis ipsum reprehenderit nemo molestias. Aut cum mollitia reprehenderit.</p>
                    <p><a href="#">Learn More <i class="icon-arrow-right22"></i></a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    
      
    
      <footer id="fh5co-footer" role="contentinfo">
        <div class="container">
          <div class="row row-pb-md">
            <div class="col-md-4 fh5co-widget">
              <h4>Air</h4>
              <p>Baiyuan has cool cups.</p>
            </div>
            <div class="col-md-2 col-md-push-1 fh5co-widget">
              <h4>Links</h4>
              <ul class="fh5co-footer-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">Portfolio</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">About</a></li>
              </ul>
            </div>
    
            <div class="col-md-2 col-md-push-1 fh5co-widget">
              <h4>Categories</h4>
              <ul class="fh5co-footer-links">
                <li><a href="#">Landing Page</a></li>
                <li><a href="#">Real Estate</a></li>
                <li><a href="#">Personal</a></li>
                <li><a href="#">Business</a></li>
                <li><a href="#">e-Commerce</a></li>
              </ul>
            </div>
    
    
          </div>
    
    
        </div>
      </footer>
    
      <div class="gototop js-top">
        <a href="#" class="js-gotop"><i class="icon-arrow-up22"></i></a>
      </div>
      
    
      </body>
    )
  }
}

export default App
