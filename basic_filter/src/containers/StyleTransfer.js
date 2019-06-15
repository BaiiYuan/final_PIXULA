import React, { Component } from 'react';
// import { NavLink, Switch, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

import BasicInput from "../component/BasicInput.js"

import * as mi from '@magenta/image';

class StyleTransfer extends Component {
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

    this.uploadImage = this.uploadImage.bind(this);
  }




  go_transfer() {
    var model = new mi.ArbitraryStyleTransferNetwork();
    // var contentImg = document.getElementById('content');
    // var styleImg = document.getElementById('style');
    const contentImg = new Image();
    contentImg.crossOrigin = "anonymous";
    contentImg.src = "https://i.imgur.com/LZUEDmb.jpg";
    const styleImg = new Image();
    styleImg.crossOrigin = "anonymous";
    styleImg.src = "https://i.imgur.com/7kLiJb7.png";

    var stylizedCanvas = document.getElementById('stylized');
    function stylize() {
      console.log(model)
      model.stylize(contentImg, styleImg).then((imageData) => {
        stylizedCanvas.getContext('2d').putImageData(imageData, 0, 0);
      });
    }
    model.initialize().then(stylize);
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

        this.setState({image_id: res.data.id})
      }
    }.bind(this)
    r.send(d)
    // this.setState({image_id: res.data.id})
  }

  render() {
    return (
      <BrowserRouter>
        <section id="container" >
          <img id="content" src="https://i.imgur.com/LZUEDmb.jpg" height="300px" />
          <img id="style" src="https://i.imgur.com/7kLiJb7.png" height="300px" />
          <button onClick={this.go_transfer}>Transfer</button>
          <br />
          <canvas id="stylized" height="800px" width="800px"/> <br />
        </section>
      </BrowserRouter>
    )
  }
}

export default StyleTransfer;