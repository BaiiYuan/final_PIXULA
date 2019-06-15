import React, { Component } from 'react'
import { Query, Mutation, renderToStringWithData } from 'react-apollo'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import {
  IMAGES_QUERY, LOGIN_QUERY 
} from '../graphql'

import "../css/style.css" 

export default class AddRender extends Component {
  constructor(props) {
      super(props);
      this.state = {
        image_id: NaN,//"LZUEDmb",
        title: "",
        description: ""
      }
  
    }
    save() {
      console.log("Save!")
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
    return(
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
                            <h2>New project title</h2>
                            <p>New project description</p>
                        </div>
                    </div>

                    <div class="col-md-12 text-center animate-box">
                        <p>
                            <label id="largeFile" className="btn btn-secondary btn-lg btn-learn" style = {{display: this.state.image_id ? "none": ""}}>
                                <input type="file" id="file" className="btn btn-primary btn-lg btn-learn" className="input-image" 
                                onChange={this.uploadImage.bind(this)}
                                />
                            </label>

                            <img id="image" src={this.state.image_id ? `https://i.imgur.com/${this.state.image_id}.png`: ""} 
                            style = {{display: this.state.image_id ? "": "none"}}
                            alt="Please upload an image to start this project." 
                            class="img-responsive img-rounded"/>
                            <canvas id="canvas1" height="300px" style={{display: 'none'}}></canvas>
                        </p>
                    </div>
                </div>
          </div>
          <div id="fh5co-started">
            <div class="overlay"></div>
                    <div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
                        <h2>Step 2</h2>
                        <p>Start the project!</p>
                        <button class="btn btn-default btn-sm" onClick={() => this.save()}>Create project</button>
              </div>
          </div>
        </div>
        
      
    )
}

}