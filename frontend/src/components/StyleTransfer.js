import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import * as mi from '@magenta/image'

function style_param(name, link)
{
  this.name = name
  this.link = link
}

var style_param_list = [
  new style_param("None", "https://i.imgur.com/HN7dRfE.jpg"),
  new style_param("Shriek", "https://cdn.glitch.com/93893683-46da-4058-829c-a05792722f2b%2Fstyle.jpg"),
  new style_param("Brick", "https://i.imgur.com/140HesI.jpg"),
  new style_param("Cloud", "https://i.imgur.com/1kL9S4o.jpg"),
  new style_param("Sketch", "https://i.imgur.com/eTz3Fm7.png"),
  new style_param("Stripes", "https://i.imgur.com/xwE6Xmm.jpg"),
  new style_param("Towers", "https://i.imgur.com/NEzkKmr.jpg"),
  new style_param("Udnie", "https://i.imgur.com/QtPXRb3.jpg"),
  new style_param("Zigzag", "https://i.imgur.com/XZ7EemI.jpg"),
]

var model = new mi.ArbitraryStyleTransferNetwork()
const MAX_TRANSFER_SIZE = 500
const LOADING_GIF = require("../containers/images/loader.gif")

export default class StyleTransfer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      styleIndex: 0,
      styleStrength: 1.,
      styleImageLink: style_param_list[0].link,
      buttonText: "Stylized!",
      transferStyle: false,
    }

    this.selectStyle = this.selectStyle.bind(this)
    this.changeStyleStrength = this.changeStyleStrength.bind(this)
    this.doStylized = this.doStylized.bind(this)
  }

  resizeImage(link) {
    return new Promise(resolve => {
      var img = new Image()
      img.setAttribute('crossOrigin', 'anonymous')
      img.src = link
      img.onload = function () {
        const rate = MAX_TRANSFER_SIZE / Math.max(img.width, img.height)

        var oc = document.createElement('canvas')
        oc.width = img.width * rate
        oc.height = img.height * rate
        oc.getContext('2d').drawImage(img, 0, 0, oc.width, oc.height)

        var outImage = new Image()
        outImage.id = "pic"
        outImage.src = oc.toDataURL()

        resolve(outImage)
      }
    })
  }

  selectStyle(e) {
    console.log(e.target.value)
    const index = parseInt(e.target.value)
    this.setState({
      styleIndex: index,
      styleImageLink: style_param_list[e.target.value].link
    })
    this.props.selectStyle(index, style_param_list[e.target.value].link)
    if (index === 0) {
      this.setState({transferStyle: false})
      document.getElementById('previewImage').src = ""
    }
  }

  changeStyleStrength(e) {
    const strength = parseFloat(e.target.value)
    // console.log(strength)
    this.setState({styleStrength: strength})
    this.props.changeStyleStrength(strength)
  }

  async doStylized(e) {
    this.setState({
      transfering: true,
      buttonText: "Stylizing...",
    })
    console.log(this.props.image_id)
    if (this.props.image_id === "")
      return

    const contentImg = await this.resizeImage(this.props.image_id)

    const styleImg = new Image()
    styleImg.crossOrigin = "anonymous"
    styleImg.src = this.state.styleImageLink
    let styleStrength = this.state.styleStrength

    var stylizedCanvas = document.createElement('canvas')
    var self = this
    function stylize() {
      console.log(model)
      model.stylize(contentImg, styleImg, styleStrength).then((imageData) => {
        stylizedCanvas.width = imageData.width
        stylizedCanvas.height = imageData.height
        stylizedCanvas.getContext('2d').putImageData(imageData, 0, 0)
        document.getElementById('previewImage').src = stylizedCanvas.toDataURL()
        self.setState({
          transferStyle: true,
          buttonText: "Stylized!",
        })
      })
    }
    model.initialize().then(stylize)
    console.log(stylizedCanvas.toDataURL())
    this.props.doStylized()
  }

  render() {
    return (
      <FormGroup width="400">
        <Label for="styleRangeLabel"><h4>Choose your style</h4></Label>
        <Input style={{width: "50%", margin: "auto"}} type="select" name="styleSelect" id="exampleSelect" onChange={(e) => this.selectStyle(e)}>
            {style_param_list.map((e, index) =>
               <option value={index} >{e.name}</option>
            )}
        </Input>
        <br/>

        <div id="stylePreview">
          <img
		  	className="card-1"
            src={this.state.styleImageLink}
            height="300"
            style={{display: this.state.styleImageLink ? "": "none"}}
          />
          <img
            src="https://i.imgur.com/fnn9J6T.png"
            height="100"
            style={{display: (this.state.transferStyle || this.state.transfering) ? "": "none"}}
          />
          <img
            src={LOADING_GIF}
            style={{display: this.state.transfering ? "": "none"}}
          />
          <img
		  	className="card-1"
            id="previewImage"
            src=""
            height="300"
            style={{display: (this.state.transferStyle && !this.state.transfering) ? "": "none"}}
            onLoad={() => this.setState({transfering: false})}
          />
        </div> <br />
        <Label for="styleStrengthLabel"><h4>Choose the strength of the style</h4></Label> <br />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={this.state.styleStrength}
          onChange={this.changeStyleStrength}
          disabled={this.state.styleIndex === 0  || !this.props.image_id || this.state.transfering}
          style={{margin: "auto"}}
        /> <br />
        <canvas
          id="stylized"
          width="500"
          height="500"
          style = {{maxWidth: "500px", maxHeight: "500px", display: "none"}}
        /> <br />
        <button className="btn btn-primary btn-lg" onClick={this.doStylized} disabled={this.state.styleIndex === 0 || !this.props.image_id || this.state.transfering}>{this.state.buttonText}</button> <br />
      </FormGroup>
    )
  }
}
