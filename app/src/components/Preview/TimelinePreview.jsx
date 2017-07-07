import React from 'react';
import classNames from 'classnames';

export default class TimelinePreview extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let active = '';
    if (this.props.active) {
      active = 'active';
    }

    return (
      <div name={this.props.name} className={classNames(this.props.className, active)} />
    );
  }
}