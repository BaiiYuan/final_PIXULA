import React, { Component } from 'react'
import { Query, Mutation, renderToStringWithData } from 'react-apollo'
import { NavLink, Switch, Route, Redirect } from "react-router-dom"
import StyleTransfer from "./StyleTransfer.js"
import * as mi from '@magenta/image'

import {
  CREATE_PROJECT_MUTATION,
  PROJECT_ID_QUERY
} from '../graphql'

import "../css/style.css"

const LOADING_GIF = require("../containers/images/loader.gif")

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?)/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
  while(n--){
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {type:mime})
}

export default class AddRender extends Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      imageOriginal: "",//"LZUEDmb",
      imageTransfer: "",
      imageFinal: "",
      title: "",
      description: "",
      styleStrength: 1.,
      submit: false,
      styleIndex: 0,
      transferStyle: false
    }
    this.doStylized = this.doStylized.bind(this)
    this.selectStyle = this.selectStyle.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
    this.handleCreateProject = this.handleCreateProject.bind(this)
    this.changeStyleStrength = this.changeStyleStrength.bind(this)
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
    activeState = activeState.filter(s => s[1] && Array.isArray(s))
    activeState = activeState.map(s => s[0]+"("+s[1]+s[2]+") ")
    // console.log(activeState.join(""))
    return activeState.join("")
  }

  useStateOnimage() {
    var image = document.getElementById("image")
    image.style.filter =  this.getAciveState()
  }

  async uploadImage(imageFile) {
    this.setState({uploading: true})
    const link = await this.uploadImageAndGetLink(imageFile)
    this.setState({
      imageOriginal: link,
    })
  }

  uploadImageAndGetLink(imageFile) {
    return new Promise(resolve => {
      const r = new XMLHttpRequest()
      const d = new FormData()

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
          resolve(res.data.link)
        }
      }.bind(this)
      r.send(d)
    })
  }

  async handleCreateProject(e) {
    if (this.state.title === "" || this.state.description === "" || this.state.imageOriginal === "")
      return
    var imageOriginal = this.state.imageOriginal
    console.log(this.state)
    if (this.state.styleIndex !== 0 && this.state.transferStyle) {
      const imageDataURL = document.getElementById('previewImage').src
      var imageFile = dataURLtoFile(imageDataURL, 'out.png')
      const link = await this.uploadImageAndGetLink(imageFile)
      console.log(link)
      imageOriginal = link
      await this.setState({
        imageTransfer: "",
        imageFinal: link,
      })
    } else {
      console.log(this.state.imageOriginal)
      await this.setState({
        imageTransfer: "",
        imageFinal: this.state.imageOriginal,
      })
    }
    const date = new Date()

    this.createProject(
      {variables: {
        author: this.props.user_id,
        title: this.state.title,
        description: this.state.description,
        imageOriginal: this.state.imageOriginal,
        imageTransfer: this.state.imageTransfer,
        imageFinal: this.state.imageFinal,
        date: date.valueOf().toString()
      }}
    )
  }

  handleCreateCompleted = data => {
    this.props.handleNewProject()
    this.setState({submit: true, project_id: data.createProject.id})
  }

  selectStyle(index, link) {
    this.setState({
      styleIndex: index,
      imageTransfer: link,
    })
    if (index === 0) {
      this.setState({transferStyle: false})
    }
  }

  changeStyleStrength(strength) {
    this.setState({styleStrength: strength})
  }

  doStylized() {
    this.setState({transferStyle: true})
  }

  renderLoginRedirect = () => {
		if (this.props.user_id == "") {
			alert("Please login to see the content on this page!")
			return <Redirect to='/login' />
		}
  }

  render(){
    if (this.state.submit) {
      return <Redirect to={`/projects/${this.state.project_id}`} />
    }
    return (
      <div>
        {this.renderLoginRedirect()}
        <Mutation mutation={CREATE_PROJECT_MUTATION} onCompleted={this.handleCreateCompleted}>
          {createProject => {
            this.createProject = createProject

            return (
              <div>
                <div id="fh5co-footer">
                  <div class="container">
                    <div class="row animate-box">
                      <div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
                        <h2>Step 1</h2>
                        <p>Name your project, description, and upload the wource image!</p>
                      </div>
                    </div>
                    <div class="row animate-box">
                        <div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
                            <input type="text" className="our_input_text_h2"
                            placeholder="Click to add title"
                            onChange={e => this.setState({title: e.target.value})} />
                            <input width="48" type="text" class="our_input_text_p"
                              placeholder="Click to add description."
                              onChange={e => this.setState({description: e.target.value})}/>
                        </div>

                    </div>

                    <div class="col-md-12 text-center animate-box">
                      <p>
                        <label id="largeFile" className="btn btn-secondary btn-lg btn-learn" style={{display: (this.state.imageOriginal || this.state.uploading) ? "none": ""}}>
                          <input type="file" id="file" className="btn btn-primary btn-lg btn-learn" className="input-image"
                          onChange={(e) => this.uploadImage(e.target.files[0])}
                          />
                        </label>
                        <img src={LOADING_GIF} style = {{display: this.state.uploading ? "": "none"}}/>
                        <img id="image" src={this.state.imageOriginal ? this.state.imageOriginal: ""}
                          style = {{maxWidth: "500px", maxHeight: "500px", display: (this.state.imageOriginal && !this.state.uploading) ? "": "none"}}
                          alt="Please upload an image to start this project."
                          class="img-responsive img-rounded card-1"
                          onLoad={() => this.setState({uploading: false})}
                        />
                        <canvas id="canvas1" height="300px" style={{display: 'none'}}></canvas>
                      </p>
                    </div>
                  </div>
                </div>
                <div id="fh5co-footer">
                  <div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
                    <h2>Step 2</h2>
                    <p>This is for style transfer! You may transfer the style of your image.</p>
                    <StyleTransfer
                      imageOriginal={this.state.imageOriginal}
                      selectStyle={this.selectStyle}
                      changeStyleStrength={this.changeStyleStrength}
                      doStylized={this.doStylized}
                    />
                  </div>
                </div>
                <div id="fh5co-started">
                  <div class="overlay"></div>
                  <div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
                    <h2>Step 3</h2>
                    <p>Start the project!</p>
                    <button class="btn btn-default btn-sm" onClick={this.handleCreateProject}>Create project</button>
                  </div>
                </div>
              </div>
            )
          }}

        </Mutation>
      </div>
    )
  }

}
