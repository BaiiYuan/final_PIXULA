import React, { Component } from 'react'
import { Query, Mutation, renderToStringWithData } from 'react-apollo'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import {
  PROJECT_INFO_QUERY,
  UPDATE_PROJECT_MUTATION
} from '../../graphql'

import "../../css/style.css" 
import { BrowserRouter } from 'react-router-dom'
import BasicInput from "../BasicInput.js"
function input_param(name, min, max, step, datascale)
{
    this.name = name;
    this.min = min;
    this.max = max;
    this.step = step;
    this.datascale = datascale;
}
var input_param_list = [
    new input_param("blur", "0", "10", "0.1", "px"), 
    new input_param("brightness", "0", "2", "0.01", ""), 
    new input_param("contrast", "0", "2", "0.01", ""), 
    new input_param("grayscale", "0", "1", "0.01", ""), 
    new input_param("hue_rotate", "-180", "180", "1", "deg"), 
    new input_param("invert", "0", "1", "0.01", ""), 
    new input_param("opacity", "0", "1", "0.01", ""), 
    new input_param("saturate", "0", "1", "0.01", ""), 
    new input_param("sepia", "0", "1", "0.01", ""), 
]
var css_filters = {
    "1997": "sepia(.5) hue-rotate(-30) saturate(1.40)", 
    "aden": "sepia(.2) brightness(1.15) saturate(1.4)", 
    "amaro": "sepia(.35) contrast(1.1) brightness(1.2) saturate(1.3)", 
    "earlybird": "sepia(.25) contrast(1.25) brightness(1.15) saturate(.9) hue-rotate(-5)", 
    "moon": "brightness(1.4) contrast(.95) saturate(0) sepia(.35)", 
    "toaster": "sepia(.25) contrast(1.5) brightness(.95) hue-rotate(-15)", 
    "xpro-ii": "sepia(.45) contrast(1.25) brightness(1.75) saturate(1.3) hue-rotate(-5)", 
    "clarendon": "sepia(.15) contrast(1.25) brightness(1.25) hue-rotate(5)", 
    "rise": "sepia(.25) contrast(1.25) brightness(1.2) saturate(.9)"
}

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
          //image_id: ""
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

            console.log(this.state.image_id)
            console.log(res.data.id)
            this.setState({image_id: `https://i.imgur.com/${res.data.id}.png`})
          }
        }.bind(this)
        r.send(d)
        // this.setState({image_id: res.data.id})
      }

  handleSave = e => {
    this.uploadImage()
    this.updateProject({
      variables: {
        id: this.props.match.params.id,
        title: this.state.title,
        description: this.state.description,
        image_id: this.state.image_id,
        blur: this.state.blur[1],
        brightness: this.state.brightness[1],
        contrast: this.state.contrast[1],
        grayscale: this.state.grayscale[1],
        hue_rotate: this.state.hue_rotate[1],
        invert: this.state.invert[1],
        opacity: this.state.opacity[1],
        saturate: this.state.saturate[1],
        sepia: this.state.sepia[1]
      }
    })
  }

  render(){
    const { id } = this.props.match.params
    console.log(id)

    if (this.state.image_id === undefined) {
      return(
        <Query query={PROJECT_INFO_QUERY} variables={{id: id}}>
          {({ loading, error, data, subscribeToMore }) => {
            if (!loading && !error) {
              console.log(data)
              let { project } = data

              let new_state = {
                title: project.title,
                description: project.description,
                blur: ["blur", project.blur, "px"],
                brightness: ["brightness", project.brightness, ""],
                contrast: ["contrast", project.contrast, ""],
                grayscale: ["grayscale", project.grayscale, ""],
                hue_rotate: ["hue-rotate", project.hue_rotate, "deg"],
                invert: ["invert", project.invert, ""],
                opacity: ["opacity", project.opacity, ""],
                saturate: ["saturate", project.saturate, ""],
                sepia: ["sepia", project.sepia, ""],
                image_id: project.image_id
              }

              this.setState(new_state)
              console.log(this.state, project.invert)


            }

            return <div></div>
          }} 
      </Query>
      )
    } else {
      return (
        <div>
          <Mutation mutation={UPDATE_PROJECT_MUTATION}>
            {updateProject => {
              this.updateProject = updateProject
              return <div></div>
            }}
          </Mutation>
          <div id="fh5co-header">
              <div class="container">
                  <div class="row animate-box">
                      <div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
                          <input type="text" className="our_input_text_h2" 
                            placeholder={this.state.title}
                            value={this.state.title}
                            onChange={e => this.setState({title: e.target.value})} />
                            <input type="text" class="our_input_text_p" 
                              placeholder={this.state.description}
                              value={this.state.description}
                              onChange={e => this.setState({description: e.target.value})}/>

                      </div>
                  </div>

                  <div class="col-md-12 text-center animate-box">
                      <p>
                          <label id="largeFile" className="btn btn-secondary btn-lg btn-learn" style = {{display: this.state.image_id ? "none": ""}}>
                              <input type="file" id="file" className="btn btn-primary btn-lg btn-learn" className="input-image" 
                              onChange={this.uploadImage.bind(this)}
                              />
                          </label>

                          <img id="image" src={this.state.image_id ? this.state.image_id: ""} 
                          style = {{display: this.state.image_id ? "": "none"}}
                          alt="Please upload an image to start this project." 
                          class="img-responsive img-rounded"/>
                          <canvas id="canvas1" height="300px" style={{display: 'none'}}></canvas>
                      </p>
                  </div>
              </div>
        </div>

            

          {input_param_list.map(e =>
          <BasicInput
              name={e.name} min={e.min} max={e.max} value={this.state[e.name][1]} step={e.step}
              datafilter={e.name} datascale="" onChange={(i) => this.applyFilter(i)}
          />
          )}

          <br />
          <button onClick={this.download_img}>Download</button>
          <button onClick={this.handleSave}>Save</button>

          <div id="fh5co-started">
      <div class="overlay"></div>
              <div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
                  <h2>Style Button</h2>
                  <button class="btn btn-default btn-sm" onClick={() => this.resetFilter()}>Origin</button>
                  {Object.keys(css_filters).map(e =>
                      <button class="btn btn-default btn-sm" onClick={(i) => this.parseFIlterCss(i, css_filters[e])}>{e}</button> 
                  )}
              </div>
        </div>
    </div>
    )}
          
  }

}
