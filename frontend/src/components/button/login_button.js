import React, { Component } from 'react'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
class LoginButton extends Component {
    render(){
        return (
            <NavLink to={"/login"}>
                <span>{
                    this.props.user_id == "" ? "login": "Hi, "+ this.props.account
                }</span>
            </NavLink>
        )
    }
}
export default LoginButton