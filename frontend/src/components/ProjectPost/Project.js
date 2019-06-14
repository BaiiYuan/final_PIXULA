import React, { Component } from 'react'
import { Query, Mutation, renderToStringWithData } from 'react-apollo'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import {
  IMAGES_QUERY, LOGIN_QUERY 
} from '../../graphql'

import "../../css/style.css" 
import { BrowserRouter } from 'react-router-dom'
import BasicInput from "../BasicInput.js"


export default class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
          blur: ["blur", 0, "px"],
          brightness: ["brightness", 1, ""],
          contrast: ["contrast", 1, ""],
          grayscale: ["grayscale", 0, ""],
          hue_rotate: ["hue-rotate", 0, "deg"],
          invert: ["invert", 0, ""],
          opacity: ["opacity", 1, ""],
          saturate: ["saturate", 1, ""],
          sepia: ["sepia", 0, ""],
          image_id: NaN,//"LZUEDmb",
        }
    
        this.applyFilter = this.applyFilter.bind(this);
        this.download_img = this.download_img.bind(this);
        this.getOrginFilter = this.getOrginFilter.bind(this);
        this.parseFIlterCss = this.parseFIlterCss.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    
      }
    
      getOrginFilter() {
        return {
          blur: ["blur", 0, "px"],
          brightness: ["brightness", 1, ""],
          contrast: ["contrast", 1, ""],
          grayscale: ["grayscale", 0, ""],
          hue_rotate: ["hue-rotate", 0, "deg"],
          invert: ["invert", 0, ""],
          opacity: ["opacity", 1, ""],
          saturate: ["saturate", 1, ""],
          sepia: ["sepia", 0, ""],
        }
      }
    
      setStateWithEvent(e) {
        // console.log(e.target.name, this.state[e.target.name])
        var tmp = this.state[e.target.name]
        tmp[1] = e.target.value
        var obj = {}
        obj[e.target.name] = tmp
        this.setState(obj)
      }
    
      getAciveState() {
        var activeState = this.state
        activeState = Object.keys(activeState).map(function(keyName, keyIndex) {
          return activeState[keyName]
        })
        activeState = activeState.filter(s => s[1] && Array.isArray(s));
        activeState = activeState.map(s => s[0]+"("+s[1]+s[2]+") ")
        // console.log(activeState.join(""))
        return activeState.join("")
      }
    
      useStateOnimage() {
        var image = document.getElementById("image")
        image.style.filter =  this.getAciveState();
      }
    
      applyFilter(e) {
        this.setStateWithEvent(e)
        this.useStateOnimage()
        console.log(this.state.image_id)
      };
    
      download_img(e) {
        var canvas = document.getElementById('canvas1');
        var ctx = canvas.getContext('2d');
        ctx.filter = this.getAciveState();
    
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = `https://i.imgur.com/${this.state.image_id}.png`;
        // console.log(image.style)
        img.onload = function() {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          var out = canvas.toDataURL("image/png");
    
          var link = document.createElement('a');
          link.download = "processed-image.png";
          link.href = out;
          link.click();
        };
      };
    
      parseFIlterCss(e, css) {
        let cssArr = css.split(" ")
        var obj = this.getOrginFilter()
        cssArr.forEach(function(element) {
          var name = element.split("(")[0]
          if (name === "hue-rotate") {
            name = "hue_rotate"
          }
          var value = element.split("(")[1].slice(0, -1);
          var tmp = obj[name]
          tmp[1] = value
          obj[name] = tmp
        });
        console.log(obj)
        this.setState(obj, this.useStateOnimage)
      }
    
      resetFilter() {
        var obj = this.getOrginFilter()
        this.setState(obj, this.useStateOnimage)
      }
    
      uploadImage() {
        const r = new XMLHttpRequest()
        const d = new FormData()
        const e = document.getElementsByClassName('input-image')[0].files[0]
        var u
        var uploadImageID
    
        const client = 'b411ccbe2c93f6e'
    
        d.append('image', e)
    
        r.open('POST', 'https://api.imgur.com/3/image/')
        r.setRequestHeader('Authorization', `Client-ID ${client}`)
        r.onreadystatechange = function () {
          if(r.status === 200 && r.readyState === 4) {
            let res = JSON.parse(r.responseText)
    
            // u = `https://i.imgur.com/${res.data.id}.png`
            // console.log(res.data.id)
    
            // const d = document.createElement('div')
            // d.className = 'image'
            // document.getElementsByTagName('body')[0].appendChild(d)
    
            // const i = document.createElement('img')
            // i.className = 'image-src'
            // i.src = u
            // document.getElementsByClassName('image')[0].appendChild(i)
    
            // const a = document.createElement('a')
            // a.className= 'image-link'
            // a.href = u
            // document.getElementsByClassName('image')[0].appendChild(a)
    
            // const p = document.createElement('p')
            // p.className = 'image-url'
            // p.innerHTML = u
            // document.getElementsByClassName('image-link')[0].appendChild(p)
    
            this.setState({image_id: res.data.id})
          }
        }.bind(this)
        r.send(d)
        // this.setState({image_id: res.data.id})
      }
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
						<div className="portfolio-entry" style={{backgroundImage: 'url(' + this.props.project_list[id].image + ')'}}></div>
					</div>
				</div>
				
			</div>
            
		</div>
        <section id="container" >
          <form>
            <input type="file" className="input-image" onChange={this.uploadImage.bind(this)}/>
          </form>
          <div id="div_filter">
              <img id="image" src={`https://i.imgur.com/${this.state.image_id}.png`} height="300" style={{display: this.state.image_id ? 'block' : 'none' }}/>
              <canvas id="canvas1" height="300px" style={{display: 'none'}}></canvas>
          </div>

          <BasicInput
            name="blur" min="0" max="10" value={this.state.blur[1]} step="0.1"
            datafilter="blur" datascale="px" onChange={(e) => this.applyFilter(e)}
          />
          <BasicInput
            name="brightness" min="0" max="2" value={this.state["brightness"][1]} step="0.01"
            datafilter="brightness" datascale="" onChange={(e) => this.applyFilter(e)}
          />
          <BasicInput
            name="contrast" min="0" max="2" value={this.state.contrast[1]} step="0.01"
            datafilter="contrast" datascale="" onChange={(e) => this.applyFilter(e)}
          />
          <BasicInput
            name="grayscale" min="0" max="1" value={this.state.grayscale[1]} step="0.01"
            datafilter="grayscale" datascale="" onChange={(e) => this.applyFilter(e)}
          />
          <BasicInput
            name="hue_rotate" min="-180" max="180" value={this.state.hue_rotate[1]} step="1"
            datafilter="hue-rotate" datascale="deg" onChange={(e) => this.applyFilter(e)}
          />
          <BasicInput
            name="invert" min="0" max="1" value={this.state.invert[1]} step="0.01"
            datafilter="invert" datascale="" onChange={(e) => this.applyFilter(e)}
          />
          <BasicInput
            name="opacity" min="0" max="1" value={this.state.opacity[1]} step="0.01"
            datafilter="opacity" datascale="" onChange={(e) => this.applyFilter(e)}
          />
          <BasicInput
            name="saturate" min="0" max="1" value={this.state.saturate[1]} step="0.01"
            datafilter="saturate" datascale="" onChange={(e) => this.applyFilter(e)}
          />
          <BasicInput
            name="sepia" min="0" max="1" value={this.state.sepia[1]} step="0.01"
            datafilter="sepia" datascale="" onChange={(e) => this.applyFilter(e)}
          />

          <br />
          <button onClick={this.download_img}>Download</button>


          <h3>Style Button</h3>
          <button onClick={() => this.resetFilter()}>Origin</button>
          <button onClick={(e) => this.parseFIlterCss(e, "sepia(.5) hue-rotate(-30) saturate(1.40)")}>1977</button>
          <button onClick={(e) => this.parseFIlterCss(e, "sepia(.2) brightness(1.15) saturate(1.4)")}>aden</button>
          <button onClick={(e) => this.parseFIlterCss(e, "sepia(.35) contrast(1.1) brightness(1.2) saturate(1.3)")}>amaro</button>
          <button onClick={(e) => this.parseFIlterCss(e, "sepia(.25) contrast(1.25) brightness(1.15) saturate(.9) hue-rotate(-5)")}>earlybird</button>
          <button onClick={(e) => this.parseFIlterCss(e, "brightness(1.4) contrast(.95) saturate(0) sepia(.35)")}>moon</button>
          <button onClick={(e) => this.parseFIlterCss(e, "sepia(.25) contrast(1.5) brightness(.95) hue-rotate(-15)")}>toaster</button>
          <button onClick={(e) => this.parseFIlterCss(e, "sepia(.45) contrast(1.25) brightness(1.75) saturate(1.3) hue-rotate(-5)")}>xpro-ii</button>
          <button onClick={(e) => this.parseFIlterCss(e, "sepia(.15) contrast(1.25) brightness(1.25) hue-rotate(5)")}>clarendon</button>
          <button onClick={(e) => this.parseFIlterCss(e, "sepia(.25) contrast(1.25) brightness(1.2) saturate(.9)")}>rise</button>

          <br />
          <br />
          <br />
          <div className="dropzone">
              <div className="info"></div>
          </div>
        </section>
	</div>
          
        
      )
  }

}