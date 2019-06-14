import React, { Component } from 'react'
import { Query, Mutation, renderToStringWithData } from 'react-apollo'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import {
  IMAGES_QUERY, LOGIN_QUERY 
} from '../../graphql'

import "../../css/style.css" 
import { BrowserRouter } from 'react-router-dom'

function projectObj(title, image) {
    this.title = title;
    this.image = image;
  }
  
  var project_list = [
    new projectObj("Project 1", "../images/portfolio-1.jpg"),
    new projectObj("Project 2", "../images/portfolio-2.jpg"), 
    new projectObj("Project 3", "../images/portfolio-3.jpg"),
    new projectObj("Project 4", "../images/portfolio-4.jpg"),
    new projectObj("Project 5", "../images/portfolio-5.jpg"),
    new projectObj("Project 6", "../images/portfolio-6.jpg"),
  ];

export default class Project extends Component {
  render(){
    const { id } = this.props.match.params;
      return(
		<div id="fh5co-portfolio">
		<div class="container">
			<div class="row animate-box">
				<div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
					<h2>{project_list[id].title}</h2>
					<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<div class="fh5co-portfolio animate-box">
						<a href="#">
							<div className="portfolio-entry" style={{backgroundImage: 'url(' + project_list[id].image + ')'}}></div>
						</a>
					</div>
				</div>
				
			</div>
		</div>
	</div>
          
        
      )
  }

}