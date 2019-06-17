import React, { Component } from 'react'
import { Query, Mutation, renderToStringWithData } from 'react-apollo'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
export default class renderLoginRedirect extends Component {
	renderLoginRedirect = () => {
        console.log(this.props.user_id == "")
		if (this.props.user_id == "") {
            console.log("redirect")
			alert("Please login first!")
			return <Redirect to='/login' />
		}
        }
    render(){
        return (
        <div>
            {this.renderLoginRedirect()};
        </div>
        )
    }
}