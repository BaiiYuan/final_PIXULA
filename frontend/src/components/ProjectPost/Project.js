import React, { Component } from 'react'
import { Query, Mutation, renderToStringWithData } from 'react-apollo'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import {
  IMAGES_QUERY, LOGIN_QUERY 
} from '../../graphql'

import "../../css/style.css" 
import { BrowserRouter } from 'react-router-dom'


export default class Project extends Component {
  render(){
    const { id } = this.props.match.params;
      return(
		<div id="fh5co-portfolio">
		<div class="container">
			<div class="row animate-box">
				<div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
					<h2>{this.props.project_list[id].title}</h2>
					<p>{this.props.project_list[id].description}</p>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<div class="fh5co-portfolio animate-box">
						<a href="#">
							<div className="portfolio-entry" style={{backgroundImage: 'url(' + this.props.project_list[id].image + ')'}}></div>
						</a>
					</div>
				</div>
				
			</div>
		</div>
	</div>
          
        
      )
  }

}