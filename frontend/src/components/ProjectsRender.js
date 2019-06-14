import React, { Component } from 'react'
import { Query, Mutation, renderToStringWithData } from 'react-apollo'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import {
  IMAGES_QUERY, LOGIN_QUERY 
} from '../graphql'

import "../css/style.css" 
import { BrowserRouter } from 'react-router-dom'

export default class ProjectsRender extends Component {
  render(){
      return(
		<div id="fh5co-portfolio">
		<div class="container">
			<div class="row animate-box">
				<div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
					<h2>Projects</h2>
					<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
				</div>
			</div>
			<div class="row">
			{this.props.project_list.map(e => 
					<div class="col-md-4">
					<div class="fh5co-portfolio animate-box">
							<div className="portfolio-entry" style={{backgroundImage: 'url(' + e.image + ')'}}></div>
							<div className="portfolio-text">
								<h3>{e.title}</h3>
								<p>{e.description}</p>
								<ul class="stuff">
									<li><i class="icon-heart2"></i>200</li>
									<li><i class="icon-eye2"></i>248</li>
									<li>
									<NavLink key={this.props.project_list.indexOf(e)} to={"/Projects/" + (this.props.project_list.indexOf(e))} class="icon-arrow-right22">
											Edit<i class="icon-arrow-right22"></i>
									</NavLink>
									</li>
								</ul>
							</div> 
					</div>
				</div>
			)}
				
			</div>
		</div>
	</div>
          
        
      )
  }

}