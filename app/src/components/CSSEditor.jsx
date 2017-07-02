import React from 'react';
import PropTypes from 'prop-types';

export default class CSSEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event.target.value, this.props);
    }
  }

  render () {
    return (
      <div>
        <textarea className="css-editor" placeholder="Enter your CSS here homie!" value={this.props.css} onChange={this.handleChange}></textarea>
      </div>
    );
  }
}

CSSEditor.propTypes = {
  // ID for editor
  id: PropTypes.number,

  // Editable CSS text
  css: PropTypes.string,

  // Callback onChange results to parent
  onChange: PropTypes.func
};