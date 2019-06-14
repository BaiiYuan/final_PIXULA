import React, { Component } from 'react'
import { Query, Mutation, renderToStringWithData } from 'react-apollo'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import {
  IMAGES_QUERY, LOGIN_QUERY 
} from '../graphql'

import "../css/style.css" 
import { BrowserRouter } from 'react-router-dom'
export default class HomeRender extends Component {
  render(){
      return(
          
        <header id="fh5co-header" class="fh5co-cover js-fullheight" role="banner">
          <div class="overlay"></div>
          <div class="container">
            <div class="row">
              <div class="col-md-8 col-md-offset-2 text-center" style={{height: "900px"}}>
                <div class="display-t js-fullheight">
                  <div class="display-tc js-fullheight animate-box" data-animate-effect="fadeIn" style={{height: "900px"}}>
                    <h1>Creativity Is A Wild Mind &amp; A Disciplined Eye</h1>
                    <p><a class="btn btn-primary btn-lg btn-demo" href="#"> View Demo</a> 
                    <a class="btn btn-primary btn-lg btn-learn">Learn More</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )
  }

}