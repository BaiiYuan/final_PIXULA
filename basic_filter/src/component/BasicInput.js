import React, { Component } from 'react';

class BasicInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      default: this.props.value,
      value: this.props.value,
    }
  }
  applyFilter = (e) => {
    this.setState({value: e.target.value});
    this.props.onChange(e)
  }

  render() {
    return (
      <div>
        <label>{this.props.datafilter}</label>
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
      </div>
    )
  }
}

export default BasicInput;

