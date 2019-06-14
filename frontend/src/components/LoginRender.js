import React, { Component } from 'react'
import { Query, Mutation, renderToStringWithData } from 'react-apollo'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import {
  IMAGES_QUERY, LOGIN_QUERY 
} from '../graphql'

import "../css/style.css" 
import { BrowserRouter } from 'react-router-dom'
export default class LoginRender extends Component {
  render(){
      return(
          
        <div id="fh5co-contact">
        <div class="container">
          <div class="row animate-box">
            <div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
              <h2>Login</h2>
              <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
            </div>
          </div>
        </div>
        <div class="container">
            <div class="row">
              <div class="col-md-3 col-md-push-1 animate-box">
              
                
              </div>
              <div class="col-md-7 col-md-push-1 animate-box">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <input type="text" class="form-control" placeholder="Account Name"/>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <input type="text" class="form-control" placeholder="Password"/>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="submit" value="login" class="btn btn-primary btn-lg btn-demo"/>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="submit" value="sign up" class="btn btn-secondary btn-lg btn-learn"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      )
  }

}