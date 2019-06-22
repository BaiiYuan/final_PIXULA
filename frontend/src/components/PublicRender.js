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
						<Query query={PUBLIC_QUERY}>
							{({ loading, error, data, subscribeToMore }) => {
								if (!loading && !error) {
									if (data.projects_public !== undefined) {
										return (
											data.projects_public.map(e => {
												// console.log(e)
												return (
												<div class="col-md-4">
													<div class="fh5co-portfolio animate-box card-2">
														<div className="portfolio-entry" style={{backgroundImage: 'url(' + e.imageFinal + ')'}}></div>
														<div className="portfolio-text ">
															<h3>{e.title}</h3>
															<p>{e.description}</p>
															<ul class="stuff">
																<li><i class="icon-heart2"></i>Made by: </li>
																<li><i class="icon-eye2"></i>somebody</li>
																<li>
																<NavLink key={e.id} to={"/Public/" + e.id} class="icon-arrow-right22">
																	View<i class="icon-arrow-right22"></i>
																</NavLink>
																</li>
															</ul>
														</div>
													</div>
												</div>
												)
											}
										)
									)
								}
							}
								return <div></div>
							}}
						</Query>
					</div>
				</div>
			</div>
		)
	}
}
