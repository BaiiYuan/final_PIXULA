import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import ScrollToTop from "../../components/util/ScrollToTop"
import {
  IMAGES_QUERY, LOGIN_QUERY
} from '../../graphql'

import "../../css/style.css"
import { BrowserRouter } from 'react-router-dom'
import HomeRender from "../../components/HomeRender"
import LoginRender from "../../components/LoginRender"
import ProjectsRender from "../../components/ProjectsRender"
import AddRender from "../../components/AddRender"
import Project from "../../components/ProjectPost/Project"

class App extends Component {
  state = {
    formTitle: '',
    formBody: '',
    authorId: 1,
    user_id: '',
    account: ''
  }


  render() {
    return (
      <BrowserRouter>
      <ScrollToTop/>
      <body>

      {/*<div class="fh5co-loader"></div>*/}

      <nav class="fh5co-nav" role="navigation">
        <div class="top-menu">
          <div class="container">
            <div class="row">
              <div class="col-xs-2">
                <div id="fh5co-logo"><NavLink to="/home">Baiyuan<span>.</span></NavLink></div>
              </div>
              <div class="col-xs-10 text-right menu-1">
                <ul>
                  <li class="active"><NavLink to="/home">Home</NavLink></li>
                  <li><NavLink to="/projects">Projects</NavLink></li>
                  <li class="btn-cta">
                    <NavLink to="/login">
                     <span>{
                       this.state.user_id == "" ? "login": "Hi, "+ this.state.account

                     }</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </nav>

      <Switch>
        <Route exact path="/projects" component={() => <ProjectsRender user_id={this.state.user_id} account={this.state.account}/>} />
        <Route path="/projects/:id?" component={(props) => <Project {...props}/>} />
        <Route path="/home" component={HomeRender} />
        <Route path="/new" component={(props) => <AddRender {...props} user_id={this.state.user_id} />} />
        <Route path="/login" component={(props) => <LoginRender {...props} login_action_handler={(user_id, account) => {this.setState({user_id: user_id, account: account})}} />} />
        <Redirect from="/" to="/home" />
      </Switch>




      <footer id="fh5co-footer" role="contentinfo">
        <div class="row copyright">
          <div class="col-md-12 text-center">
            <p>
              <small class="block">If you're seeing this, you are probably viewing a half-completed website.</small>
              <small class="block">Designed by <a href="http://freehtml5.co/" target="_blank">FreeHTML5.co</a> Demo Images: <a href="http://unsplash.co/" target="_blank">Unsplash</a></small>
            </p>
            <p>
              <ul class="fh5co-social-icons">
                <li><a href="#"><i class="icon-twitter"></i></a></li>
                <li><a href="#"><i class="icon-facebook"></i></a></li>
                <li><a href="#"><i class="icon-linkedin"></i></a></li>
                <li><a href="#"><i class="icon-dribbble"></i></a></li>
              </ul>
            </p>
          </div>
        </div>
      </footer>

      <div class="gototop js-top">
        <a href="#" class="js-gotop"><i class="icon-arrow-up22"></i></a>
      </div>

      </body>
      </BrowserRouter>

    )
  }
}

export default App
