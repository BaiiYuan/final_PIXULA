import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import * as mi from '@magenta/image';

function style_param(name, link)
{
    this.name = name;
    this.link = link;
}
var style_param_list = [
  new style_param("None", NaN),
  new style_param("Shriek", "https://cdn.glitch.com/93893683-46da-4058-829c-a05792722f2b%2Fstyle.jpg"),
  new style_param("Brick", "https://i.imgur.com/140HesI.jpg"),
  new style_param("Cloud", "https://i.imgur.com/1kL9S4o.jpg"),
  new style_param("Sketch", "https://i.imgur.com/eTz3Fm7.png"),
  new style_param("Stripes", "https://i.imgur.com/xwE6Xmm.jpg"),
  new style_param("Towers", "https://i.imgur.com/NEzkKmr.jpg"),
  new style_param("Udnie", "https://i.imgur.com/QtPXRb3.jpg"),
  new style_param("Zigzag", "https://i.imgur.com/XZ7EemI.jpg"),
]

export default class StyleTransfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styleIndex: 0,
      styleStrength: 1.,
      styleImageLink: style_param_list[0].link,
    }

    this.selectStyle = this.selectStyle.bind(this);
    this.changeStyleStrength = this.changeStyleStrength.bind(this);
    this.doStylized = this.doStylized.bind(this);
  }

  selectStyle(e) {
    this.setState({
      styleIndex: e.target.value,
      styleImageLink: style_param_list[e.target.value].link
    })
    this.props.selectStyle(e.target.value, style_param_list[e.target.value].link)
  }

  changeStyleStrength(e) {
    const strength = parseFloat(e.target.value)
    console.log(strength)
    this.setState({styleStrength: strength})
    this.props.changeStyleStrength(strength)
  }

  doStylized(e) {
    this.props.doStylized()
  }

  render() {
    return (
      <FormGroup>
        <Label for="styleRangeLabel">Style Transfer</Label>
        <Input type="select" name="styleSelect" id="exampleSelect" onChange={(e) => this.selectStyle(e)}>
            {style_param_list.map((e, index) =>
               <option value={index} >{e.name}</option>
            )}
        </Input><br />
        <img src={this.state.styleImageLink} height="300" style = {{display: this.state.styleImageLink ? "": "none"}}/> <br />
        <Label for="styleStrengthLabel">Strength</Label>
        <Input type="range" min="0" max="1" step="0.01" value={this.state.styleStrength} onChange={this.changeStyleStrength}/>
        <Button onClick={this.doStylized}> Stylized! </Button>
        <canvas id="stylized" height="700px" width="700px"/> <br />
      </FormGroup>
    )
  }
}
