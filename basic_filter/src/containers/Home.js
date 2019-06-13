import React, { Component } from 'react';
// import { NavLink, Switch, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

// import Sidebar from "./Sidebar.js"
// import { Header } from "../component/Header.js"
// import Content from "./Content.js"
import BasicInput from "../component/BasicInput.js"


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blur: ["blur", NaN, "px"],
      brightness: ["brightness", NaN, "%"],
      contrast: ["contrast", NaN, "%"],
      grayscale: ["grayscale", NaN, "%"],
      hue_rotate: ["hue-rotate", NaN, "deg"],
      invert: ["invert", NaN, "%"],
      opacity: ["opacity", NaN, "%"],
      saturate: ["saturate", NaN, "%"],
      sepia: ["sepia", NaN, "%"],
    }

    this.applyFilter = this.applyFilter.bind(this);
    this.download_img = this.download_img.bind(this);
    this.transfer_img = this.transfer_img.bind(this);
    this.initFilter = this.initFilter.bind(this);
    this.parseFIlterCss = this.parseFIlterCss.bind(this);
  }


  initFilter() {
    this.setState({
      blur: ["blur", NaN, "px"],
      brightness: ["brightness", NaN, "%"],
      contrast: ["contrast", NaN, "%"],
      grayscale: ["grayscale", NaN, "%"],
      hue_rotate: ["hue-rotate", NaN, "deg"],
      invert: ["invert", NaN, "%"],
      opacity: ["opacity", NaN, "%"],
      saturate: ["saturate", NaN, "%"],
      sepia: ["sepia", NaN, "%"],
    });
  }
  getClearFilter() {
    return {
      blur: ["blur", NaN, "px"],
      brightness: ["brightness", NaN, "%"],
      contrast: ["contrast", NaN, "%"],
      grayscale: ["grayscale", NaN, "%"],
      hue_rotate: ["hue-rotate", NaN, "deg"],
      invert: ["invert", NaN, "%"],
      opacity: ["opacity", NaN, "%"],
      saturate: ["saturate", NaN, "%"],
      sepia: ["sepia", NaN, "%"],
    }
  }

  setStateWithEvent(e) {
    console.log(e.target.name, this.state[e.target.name])
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
    activeState = activeState.filter(s => s[1]);
    activeState = activeState.map(s => s[0]+"("+s[1]+s[2]+") ")
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
    img.src = "https://i.imgur.com/LZUEDmb.jpg";
    // console.log(image.style)
    img.onload = function() {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      var out = canvas.toDataURL("image/png");

      // var link = document.createElement('a');
      // link.download = "processed-image.png";
      // link.href = out;
      // link.click();
    };
  };

  transfer_img(e) {
    // var filter = document.getElementById('div_filter');
    // filter.classList.add("earlybird");



    var img = document.getElementById("image");

    // pixelsJS.filterImg(img, "horizontal_lines");
  };

  parseFIlterCss(e, css) {
    let cssArr = css.split(" ")
    var obj = this.getClearFilter()
    console.log(obj)
    cssArr.forEach(function(element) {
      var name = element.split("(")[0]
      if (name == "hue-rotate") {
        name = "hue_rotate"
      }
      var value = element.split("(")[1].slice(0, -1);
      var tmp = obj[name]
      tmp[1] = value
      obj[name] = tmp
    });
    this.setState(obj)
    this.useStateOnimage()
  }

  resetFilter() {
    this.initFilter()
    this.useStateOnimage()
  }

  render() {
    return (
      <BrowserRouter>
        <section id="container" >
          <div id="div_filter">
              <img id="image" src="https://i.imgur.com/LZUEDmb.jpg" height="300" />
              <canvas id="canvas1" height="300px"></canvas>
          </div>

          <BasicInput
            name="blur" min="0" max="10" value="0" step="0.1"
            datafilter="blur" datascale="px" onChange={(e) => this.applyFilter(e)}
          />
          <BasicInput
            name="brightness" min="0" max="200" value="100" step="1"
            datafilter="brightness" datascale="%" onChange={(e) => this.applyFilter(e)}
          />
          <BasicInput
            name="contrast" min="0" max="200" value="100" step="1"
            datafilter="contrast" datascale="%" onChange={(e) => this.applyFilter(e)}
          />
          <BasicInput
            name="grayscale" min="0" max="100" value="0" step="1"
            datafilter="grayscale" datascale="%" onChange={(e) => this.applyFilter(e)}
          />
          <BasicInput
            name="hue_rotate" min="-180" max="180" value="0" step="1"
            datafilter="hue-rotate" datascale="deg" onChange={(e) => this.applyFilter(e)}
          />
          <BasicInput
            name="invert" min="0" max="100" value="0" step="1"
            datafilter="invert" datascale="%" onChange={(e) => this.applyFilter(e)}
          />
          <BasicInput
            name="opacity" min="0" max="100" value="100" step="1"
            datafilter="opacity" datascale="%" onChange={(e) => this.applyFilter(e)}
          />
          <BasicInput
            name="saturate" min="0" max="100" value="100" step="1"
            datafilter="saturate" datascale="%" onChange={(e) => this.applyFilter(e)}
          />
          <BasicInput
            name="sepia" min="0" max="100" value="0" step="1"
            datafilter="sepia" datascale="%" onChange={(e) => this.applyFilter(e)}
          />

          <br />
          <button onClick={this.download_img}>Download</button>
          <button onClick={this.transfer_img}>Transfer</button>



          <h3>Style Button</h3>
          <button onClick={() => this.resetFilter()}>Origin</button>
          <button onClick={(e) => this.parseFIlterCss(e, "sepia(50) hue-rotate(-30) saturate(140)")}>1977</button>
          <button onClick={(e) => this.parseFIlterCss(e, "sepia(20) brightness(115) saturate(140)")}>aden</button>
          <button onClick={(e) => this.parseFIlterCss(e, "sepia(35) contrast(110) brightness(120) saturate(130)")}>amaro</button>
          <br />
          <br />
          <br />
          <div className="dropzone">
              <div className="info"></div>
          </div>
        </section>
      </BrowserRouter>
    )
  }
}

export default Home;