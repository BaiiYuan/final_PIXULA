import React, { Component } from 'react'
import { Query, Mutation, renderToStringWithData } from 'react-apollo'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import StyleTransfer from "./StyleTransfer.js"
import * as mi from '@magenta/image';

import {
  CREATE_PROJECT_MUTATION,
  PROJECT_ID_QUERY
} from '../graphql'

import "../css/style.css"

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}

export default class AddRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image_id: "",//"LZUEDmb",
      title: "",
      description: "",
      submit: false,
      styleIndex: 0,
      transferStyle: false
    }
    this.doStylized = this.doStylized.bind(this);
    this.selectStyle = this.selectStyle.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleCreateProject = this.handleCreateProject.bind(this);
    this.changeStyleStrength = this.changeStyleStrength.bind(this);
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

  async uploadImage(imageFile) {
    const link = await this.uploadImageAndGetLink(imageFile)
    this.setState({image_id: link})
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
          console.log(this.state.image_id)
          console.log(res.data)
          resolve(res.data.link)
        }
      }.bind(this)
      r.send(d)
    })
  }

  async handleCreateProject(e) {
    if (this.state.title === "" || this.state.description === "" || this.state.image_id === "")
      return
    var image_id = this.state.image_id
    console.log(this.state)
    if (this.state.styleIndex !== 0 && this.state.transferStyle) {
      const imageDataURL = document.getElementById('previewImage').src
      var imageFile = dataURLtoFile(imageDataURL, 'out.png');
      const link = await this.uploadImageAndGetLink(imageFile)
      console.log(link)
      image_id = link
    }
    this.createProject(
      {variables: {
        author: this.props.user_id,
        title: this.state.title,
        description: this.state.description,
        image_id: image_id,
      }}
    )
    console.log(this.state)
    this.setState({submit: true})
  }

  selectStyle(index, link) {
    this.setState({
      styleIndex: index,
      styleImageLink: link,
    })
    if (index === 0) {
      this.setState({transferStyle: false})
    }
  }

  changeStyleStrength(strength) {
    this.setState({styleStrength: strength})
  }

  doStylized() {
    this.setState({transferStyle: true});
  }

  renderLoginRedirect = () => {
		if (this.props.user_id == "") {
			return <Redirect to='/login' />
		}
  }

  render(){
    return (
      <div>
        {this.renderLoginRedirect()}
        {this.state.submit &&
          <Query query={PROJECT_ID_QUERY} variables={{author: this.props.user_id, title: this.state.title}}>
            {({loading, error, data}) => {
              if (loading || error)
                return <div></div>

              return <Redirect push to={"/Projects/" + data.project_id.id} />
            }}
          </Query>
        }
        <Mutation mutation={CREATE_PROJECT_MUTATION}>
          {createProject => {
            this.createProject = createProject

            return (
              <div>
                <div id="fh5co-header">
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
                        <label id="largeFile" className="btn btn-secondary btn-lg btn-learn" style = {{display: this.state.image_id ? "none": ""}}>
                          <input type="file" id="file" className="btn btn-primary btn-lg btn-learn" className="input-image"
                          onChange={(e) => this.uploadImage(e.target.files[0])}
                          />
                        </label>

                        <img id="image" src={this.state.image_id ? this.state.image_id: ""}
                        style = {{maxWidth: "500px", maxHeight: "500px", display: this.state.image_id ? "": "none"}}
                        alt="Please upload an image to start this project."
                        class="img-responsive img-rounded"/>
                        <canvas id="canvas1" height="300px" style={{display: 'none'}}></canvas>
                      </p>
                    </div>
                  </div>
                </div>
                <div id="fh5co-footer">
                  <div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
                    <h2>Step 2</h2>
                    <p>Select the Style Transfer!</p>
                    <StyleTransfer
                      image_id={this.state.image_id}
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
