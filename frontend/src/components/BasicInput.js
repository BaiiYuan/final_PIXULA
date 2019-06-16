import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

class BasicInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      default: this.props.value,
      value: this.props.value,
    }
  }

  applyFilter(e) {
    // console.log(e.target.value)
    if (e.target.value !== "") {
      this.setState({value: parseFloat(e.target.value)});
    } else {
      this.setState({value: parseFloat(this.props.default)});
    }
    this.props.onChange(e)
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({value: this.props.value});
    }
  }


  render() {
    return (
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <label>{this.props.datafilter}</label>
        <br />
        <input
          type="range"
          name={this.props.name}
          min={this.props.min}
          max={this.props.max}
          value={this.state.value}
          step={this.props.step}
          onChange={(e) => this.applyFilter(e)}
          datafilter={this.props.datafilter}
          datascale={this.props.datascale}
        />
        <br />
        <InputGroup style={{height: '30px', width: '80px'}}>
          <Input
            style={{height: '30px', width: '60px'}}
            name={this.props.name}
            value={this.state.value}
            min={this.props.min}
            max={this.props.max}
            type="number"
            step={this.props.step}
            onChange={(e) => this.applyFilter(e)}
          />
        </InputGroup>
        <br />
      </div>
    )
  }
}

export default BasicInput;

