import React from 'react';
import _ from 'lodash';
import { Tooltip } from 'antd';
import Node from './Node.jsx';

export default class Element extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnHover = this.handleOnHover.bind(this);
  }

  /*
   * @param {object} e - event
   * @param {function} action
   * @param {array} keyPath
   */
  handleOnClick(e, action, keyPath) {
    e.stopPropagation();
    action(keyPath);
  }

  /*
   * @param {object} e - event
   * @param {function} action
   * @param {array} value
   */
  handleOnHover(e, action, value) {
    // e.stopPropagation();
    action(value);
  }

  render () {
    const { children, animations, name, linkedAnimationName, linkedAnimationKeyPath, getProperties, keyPath, updatePreviewKeyPath, handleTimelineChange, onClickElement, ...props } = this.props;
    const animationName = getProperties(linkedAnimationKeyPath, animations, 'animations').name;

    return (
      <Tooltip title={name}>
        <Node
          { ...props }
          name={ name }
          data-animation-name={ animationName }
          onClick={(e) => {this.handleOnClick(e, onClickElement, keyPath)}}
          onMouseEnter={(e) => {this.handleOnHover(e, updatePreviewKeyPath, keyPath)}}
          onMouseLeave={(e) => {this.handleOnHover(e, updatePreviewKeyPath, [])}}
        >
          { children }
        </Node>
      </Tooltip>
    );
  }
}