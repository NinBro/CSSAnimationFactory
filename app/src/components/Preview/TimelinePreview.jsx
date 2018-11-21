import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

export default class TimelinePreview extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const { active, className, name, timelineProperties } = this.props;
    let activeStyle = '';
    if (active) {
      activeStyle = 'active';
    }

    // console.log('TimelinePreview - render', this.props);

    // let element;
    // if (_.isObject(timelineProperties) && timelineProperties.visible === false) {
    //   element = null;
    // } else {
    //   element = <div name={name} className={classNames(className, activeStyle)} />;;
    // }

    return (
      <div name={name} className={classNames(className, activeStyle)} />
    );
  }
}