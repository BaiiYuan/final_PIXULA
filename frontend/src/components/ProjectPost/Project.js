import React, { Component } from 'react'
import { Query, Mutation, renderToStringWithData } from 'react-apollo'
import { NavLink, Switch, Route, Redirect } from "react-router-dom"
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

import {
  PROJECT_INFO_QUERY,
  UPDATE_PROJECT_MUTATION
} from '../../graphql'

import "../../css/style.css"
import { BrowserRouter } from 'react-router-dom'
import BasicInput from "../BasicInput.js"
import StyleTransfer from "../StyleTransfer.js"
function input_param(name, min, max, step, datascale)
{
  this.name = name
  this.min = min
  this.max = max
  this.step = step
  this.datascale = datascale
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

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?)/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
  while(n--){
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {type:mime})
}

const LOADING_GIF = require("../../containers/images/loader.gif")

export default class Project extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blur: ["blur", "0", "px"],
      brightness: ["brightness", "1", ""],
      contrast: ["contrast", "1", ""],
      grayscale: ["grayscale", "0", ""],
      hue_rotate: ["hue-rotate", "0", "deg"],
      invert: ["invert", "0", ""],
      opacity: ["opacity", "1", ""],
      saturate: ["saturate", "1", ""],
      sepia: ["sepia", "0", ""],
      styleIndex: "0",
      styleStrength: "1.",
      transferStyle: false,
      loading: true,
      save: false
    }

    this.applyFilter = this.applyFilter.bind(this)
    this.download_img = this.download_img.bind(this)
    this.getOrginFilter = this.getOrginFilter.bind(this)
    this.parseFIlterCss = this.parseFIlterCss.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  getOrginFilter() {
    return {
      blur: ["blur", "0", "px"],
      brightness: ["brightness", "1", ""],
      contrast: ["contrast", "1", ""],
      grayscale: ["grayscale", "0", ""],
      hue_rotate: ["hue-rotate", "0", "deg"],
      invert: ["invert", "0", ""],
      opacity: ["opacity", "1", ""],
      saturate: ["saturate", "1", ""],
      sepia: ["sepia", "0", ""],
    }
  }

  setStateWithEvent(e) {
    var oldValue = this.state[e.target.name]
    oldValue[1] = e.target.value
    var obj = {}
    obj[e.target.name] = oldValue
    this.setState(obj)
  }

  getAciveState() {
    var activeState = this.state
    activeState = Object.keys(activeState).map(function(keyName, keyIndex) {
      return activeState[keyName]
    })
    activeState = activeState.filter(s => s[1] && Array.isArray(s))
    activeState = activeState.map(s => s[0]+"("+s[1]+s[2]+") ")
    // console.log(activeState.join(""))
    return activeState.join("")
  }

  useStateOnimage() {
    var image = document.getElementById("image")
    image.style.filter =  this.getAciveState()
  }

  applyFilter(e) {
    this.setStateWithEvent(e)
    this.useStateOnimage()
  }

  getRevisedImageFromCanvas() {
    return new Promise(resolve => {
      const filter = this.getAciveState()

      var img = new Image()
      img.setAttribute('crossOrigin', 'anonymous')
      img.src = this.state.imageOriginal
      // console.log(image.style)

      img.onload = function() {
        console.log(img.width, img.height)
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')

        canvas.width = img.width
        canvas.height = img.height
        ctx.filter = filter

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const imageDataURL = canvas.toDataURL("image/png")
        resolve(imageDataURL)
      }
    })
  }

  async download_img(e) {
    const imageDataURL = await this.getRevisedImageFromCanvas()
    // console.log(imageDataURL)
    var link = document.createElement('a')
    link.download = "processed-image.png"
    link.href = imageDataURL
    link.click()
  }

  parseFIlterCss(e, css) {
    let cssArr = css.split(" ")
    var obj = this.getOrginFilter()
    cssArr.forEach(function(element) {
      var name = element.split("(")[0]
      if (name === "hue-rotate") {
        name = "hue_rotate"
      }
      var value = element.split("(")[1].slice(0, -1)
      var tmp = obj[name]
      tmp[1] = value
      obj[name] = tmp
    })
    console.log(obj)
    this.setState(obj, this.useStateOnimage)
  }

  resetFilter() {
    var obj = this.getOrginFilter()
    this.setState(obj, this.useStateOnimage)
  }

  uploadImage(imageFile) {
    const r = new XMLHttpRequest()
    const d = new FormData()
    var uploadImageID

    const client = 'b411ccbe2c93f6e'
    console.log(imageFile)
    d.append('image', imageFile)

    r.open('POST', 'https://api.imgur.com/3/image/')
    r.setRequestHeader('Authorization', `Client-ID ${client}`)
    r.onreadystatechange = function () {
      if(r.status === 200 && r.readyState === 4) {
        let res = JSON.parse(r.responseText)

        console.log(this.state.imageOriginal)
        console.log(res.data)
        this.setState({imageOriginal: res.data.link})
      }
    }.bind(this)
    r.send(d)
  }

  async handleSave(e) {
    const imageDataURL = await this.getRevisedImageFromCanvas()
    var imageFile = dataURLtoFile(imageDataURL, 'out.png')
    console.log(imageFile)

    // this.uploadImage(imageFile)
    console.log("one")
    this.updateProject({
      variables: {
        id: this.props.match.params.id,
        title: this.state.title,
        description: this.state.description,
        blur: this.state.blur[1],
        brightness: this.state.brightness[1],
        contrast: this.state.contrast[1],
        grayscale: this.state.grayscale[1],
        hue_rotate: this.state.hue_rotate[1],
        invert: this.state.invert[1],
        opacity: this.state.opacity[1],
        saturate: this.state.saturate[1],
        sepia: this.state.sepia[1],
        public: this.state.public,
        imageTransfer: this.state.imageTransfer,
        imageFinal: this.state.imageFinal
      }
    })
    console.log("two")

    const new_project = {
      id: this.props.match.params.id,
      title: this.state.title,
      description: this.state.description,
      imageOriginal: this.state.imageOriginal
    }

    this.props.handleEditProject(new_project)
    // this.setState({save: true})
    console.log("good")
  }

  renderLoginRedirect = () => {
		if (this.props.user_id == "") {
			alert("Please login to see the content on this page!")
			return <Redirect to='/login' />
		}
  }

  render(){
    const { id } = this.props.match.params
    console.log(id)

    if (this.state.imageOriginal === undefined) {
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
                imageOriginal: project.imageOriginal,
                imageTransfer: project.imageTransfer,
                imageFinal: project.imageFinal,
                public: project.public
              }

              this.setState(new_state, this.useStateOnimage)
            }

            return <div></div>
          }}
      </Query>
      )
    } else {
      if (this.state.save)
        return <Redirect push to={"/projects"} />

      return (
        <div>
          {this.renderLoginRedirect()}
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
                          <img id="image" src={this.state.imageOriginal ? this.state.imageOriginal: ""}

                            style = {{maxWidth: "400px", maxHeight: "400px", display: this.state.imageOriginal ? "": "none"}}
                            alt="Please upload an image to start this project."
                            class="img-responsive img-rounded card-2"
                            onLoad={() => this.setState({loading: false})}
                          />
                          <img src={LOADING_GIF} style = {{display: this.state.loading ? "": "none"}}/>
                      </p>
                  </div>
              </div>
          </div>
          
          <div className="container">
            <div className="row">
              <div className="card-2 col-md-6" style={{padding: "40px"}}>
								<div className="portfolio-text ">
                 <h2> Style Sliders</h2>
                </div>
                {input_param_list.map(e =>
                <BasicInput
                    name={e.name} min={e.min} max={e.max} value={this.state[e.name][1]} step={e.step}
                    datafilter={e.name} datascale="" onChange={(i) => this.applyFilter(i)}
                />
                )}
              </div>

              <div class="card-2 col-md-5 col-md-offset-1  " style={{padding: "40px"}}>
                <div className="portfolio-text ">
                  <h2>Style Buttons</h2>
                </div>
                <button class="btn btn-primary btn-lg" onClick={() => this.resetFilter()}>Origin</button>
                {Object.keys(css_filters).map(e =>
                  <button class="btn btn-primary btn-lg" onClick={(i) => this.parseFIlterCss(i, css_filters[e])}>{e}</button>
                )}
                <p></p>
                <label class="checkbox-container"> 
                  <h4 style={{marginBottom: "2px"}}>Make Public</h4>
                  <input type="checkbox"/>
                  <span class="checkmark"></span> 
                  <p>If you made something public, people can see them through public gallery.</p>
                </label>
              </div>
            </div>
          </div>

          <br />


          <div id="fh5co-started">

            <div class="overlay"></div>
            <div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
              <h2>Save progress or Download!</h2>
              <NavLink key={id} to={"/download/" + id} class="icon-arrow-right22">
                <button class="btn btn-default btn-sm" >Download</button>
					    </NavLink>
              <NavLink to={"/projects"}>
                <button class="btn btn-default btn-sm" onClick={this.handleSave}>Save</button>
              </NavLink>
            </div>
          </div>
        </div>
      )
    }
  }
}
