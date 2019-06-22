import React, { Component } from 'react'
import { Query, Mutation, renderToStringWithData } from 'react-apollo'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import {
  PUBLIC_QUERY
} from '../graphql'

import "../css/style.css"
import { BrowserRouter } from 'react-router-dom'


export default class PublicRender extends Component {
	renderLoginRedirect = () => {
		if (this.props.user_id == "") {
			alert("Please login to see the content on this page!")
			return <Redirect to='/login' />
		}
  }

  constructor(props) {
    super(props)
    this.state = {}
    this.getActiveState = this.getActiveState.bind(this)
  }

  getActiveState(project) {
  	// console.log("project -> ", project)
  	if (!project) { return "" }
    let activeState = {
      blur: ["blur", project.blur, "px"],
      brightness: ["brightness", project.brightness, ""],
      contrast: ["contrast", project.contrast, ""],
      grayscale: ["grayscale", project.grayscale, ""],
      hue_rotate: ["hue-rotate", project.hue_rotate, "deg"],
      invert: ["invert", project.invert, ""],
      opacity: ["opacity", project.opacity, ""],
      saturate: ["saturate", project.saturate, ""],
      sepia: ["sepia", project.sepia, ""],
    }
    activeState = Object.keys(activeState).map(function(keyName, keyIndex) {
      return activeState[keyName]
    })
    activeState = activeState.filter(s => s[1] && Array.isArray(s))
    activeState = activeState.map(s => s[0]+"("+s[1]+s[2]+") ")
    activeState = activeState.join("")
    return activeState
  }

	render(){
		// console.log(this.props.user_id)

		return(
			<div id="fh5co-portfolio">
				{this.renderLoginRedirect()}
				{/* <renderLoginRedirect user_id = {this.props.user_id}/> */}
				<div class="container">
					<div class="row animate-box">
						<div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
							<h2>Public Gallery</h2>
							<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
						</div>
					</div>

					<div class="row">
					{this.props.projects.map(e => {
							return (
							<div class="col-md-4">
								<div class="fh5co-portfolio animate-box card-2">
									<div className="portfolio-entry" style={{backgroundImage: 'url(' + e.imageFinal + ')', filter: this.getActiveState(e)}}></div>
									<div className="portfolio-text ">
										<h3>{e.title}</h3>
										<p>{e.description}</p>
										<ul class="stuff">
											<li>
											<NavLink key={e.id} to={"/Public/" + e.id} class="icon-arrow-right22">
												View<i class="icon-arrow-right22"></i>
											</NavLink>
											</li>
											<li><i class="icon-eye2"></i>Made by: somebody</li>
										</ul>
									</div>
								</div>
							</div>
							)
						})
					}
					</div>
				</div>
			</div>
		)
	}
}
