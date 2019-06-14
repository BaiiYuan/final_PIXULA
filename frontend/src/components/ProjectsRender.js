import React, { Component } from 'react'
import { Query, Mutation, renderToStringWithData } from 'react-apollo'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import {
  IMAGES_QUERY, LOGIN_QUERY 
} from '../graphql'

import "../css/style.css" 
import { BrowserRouter } from 'react-router-dom'
var images =  "../images/portfolio-2.jpg";

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
			{project_list.map(e => 
					<div class="col-md-4">
					<div class="fh5co-portfolio animate-box">
						<a href="#">
							<div className="portfolio-entry" style={{backgroundImage: 'url(' + e.image + ')'}}></div>
							<div className="portfolio-text">
								<h3>{e.title}</h3>
								<ul class="stuff">
									<li><i class="icon-heart2"></i>200</li>
									<li><i class="icon-eye2"></i>248</li>
									<li><i class="icon-download3"></i>240</li>
								</ul>
							</div> 
						</a>
					</div>
				</div>
			)}
				
			</div>
		</div>
	</div>
          
        
      )
  }

}