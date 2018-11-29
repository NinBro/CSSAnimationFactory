import React from 'react';
import classNamez from 'classnames';
import _ from 'lodash';
import { Tooltip } from 'antd';

export default class TimelinePreview extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  /*
   * @param {object} e - event
   * @param {function} action
   * @param {object} props
   */
  handleOnClick(e, action, props) {
    e.stopPropagation();
    action(props);
  }

  render () {
    const { inactive, classNames, timelineName, keyPath, timelineProperties, updatePreviewKeyPath, handleTimelineChange } = this.props;

    let inactiveStyle = '';
    if (inactive) {
      inactiveStyle = 'inactive';
    }

    console.log('TimelinePreview - render', this.props);

    return (
      <Tooltip title={timelineName}>
        <div
          name={timelineName}
          className={classNamez(classNames, inactiveStyle)}
          onClick={(e) => {this.handleOnClick(e, handleTimelineChange, this.props)}}
          onMouseEnter={() => {updatePreviewKeyPath(keyPath)}}
          onMouseLeave={() => {updatePreviewKeyPath([])}}
        />
      </Tooltip>
    );
  }
}