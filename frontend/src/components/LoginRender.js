import React, { Component } from 'react'
import { Query, Mutation, renderToStringWithData } from 'react-apollo'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import {
  LOGIN_QUERY
} from '../graphql'

import "../css/style.css"
import { BrowserRouter } from 'react-router-dom'
export default class LoginRender extends Component {
  state = {
    login_button_on: false,
    account: '',
    password: ''
  }

  render(){
    return(
      <div id="fh5co-contact" onKeyPress={this.handleEnterKey}>
      <div class="container">
        <div class="row animate-box">
          <div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
            <h2>Login</h2>
            <p>To see your projects, please login here.If you don't have an account, you are welcomed to register one.</p>
          </div>
        </div>

        {this.state.login_button_on &&
          <Query query={LOGIN_QUERY} variables={{ account: this.state.account, password: this.state.password }}>
            {({ loading, error, data, subscribeToMore }) => {
              if (!loading && !error) {
                if(data.users[0] !== undefined){
                  this.props.login_action_handler(data.users[0].id, this.state.account)
                  return <Redirect push to={{pathname: "/projects", state: { some_state: "asdf"}}}/>
                }else{
                  alert("Wrong password or username!")
                  window.location.reload();
                }
              }
              return <div></div>
            }}
          </Query>
        }

      </div>
      <div class="container">
          <div class="row">
            <div class="col-md-3 col-md-push-1 animate-box">

            </div>
            <div class="col-md-7 col-md-push-1 animate-box">
              <div class="row">
                <div class="col-md-10">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Account Name" value={this.state.account} onChange={e => this.setState({account: e.target.value})} />
                  </div>
                </div>
                <div class="col-md-10">
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Password"  value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <input type="submit" value="login" class="btn btn-primary btn-lg btn-demo"
                      onClick={this.handleLoginButton}/>
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

  handleLoginButton = e => {
    if (this.state.account !== '' && this.state.password !== '') {
      this.setState({login_button_on: true})
    }
  }
  handleEnterKey = e => {
    if (e.key === "Enter" && this.state.account !== '' && this.state.password !== '') {
      this.setState({login_button_on: true})
    }
  }
}