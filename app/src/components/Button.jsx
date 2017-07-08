import React from 'react';
import PropTypes from 'prop-types';
import { Button as AButton } from 'antd';

export default class Button extends React.Component {
  render () {
    return (
      <AButton onClick={this.props.onClick}>
        { this.props.children }
      </AButton>
    );
  }
}

Button.propTypes = {
  // Content to go in button e.g. text
  children: PropTypes.node,

  // set the handler to handle click event  function
  onClick: PropTypes.func
};