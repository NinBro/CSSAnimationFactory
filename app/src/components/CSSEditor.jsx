import React from 'react';

export default class CSSEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.props.onChange(event.target.value);
  }

  render () {

    console.log(this.props.data);

    return (
      <div>
        <textarea className="css-editor" placeholder="Enter your CSS here homie!" value={this.props.data} onChange={this.handleChange}></textarea>
      </div>
    );
  }
}