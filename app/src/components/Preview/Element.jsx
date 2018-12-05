import React from 'react';
import _ from 'lodash';
import { Tooltip } from 'antd';

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
    const { children, name, keyPath, updatePreviewKeyPath, handleTimelineChange, onClickElement, ...props } = this.props;
    return (
      <Tooltip title={name}>
        <div
          { ...props }
          name={ name }
          onClick={(e) => {this.handleOnClick(e, onClickElement, keyPath)}}
          onMouseEnter={(e) => {this.handleOnHover(e, updatePreviewKeyPath, keyPath)}}
          onMouseLeave={(e) => {this.handleOnHover(e, updatePreviewKeyPath, [])}}
        >
          { children }
        </div>
      </Tooltip>
    );
  }
}