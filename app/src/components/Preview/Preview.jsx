import React from 'react';
import classNames from 'classnames';
import TimelinePreview from './TimelinePreview.jsx';
import './Preview.scss';

export default class Preview extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let active = '';
    if (this.props.active) {
      active = 'active';
    }

    // renderDescendants
    let renderDescendants = '';
    if (this.props.descendants && this.props.descendants.length) {
      const descendants = this.props.descendants;
      // console.log(descendants);
      renderDescendants = descendants.map((descendant) =>
        <TimelinePreview name={descendant.timelineName} className={descendant.classNames} active={descendant.active} />
      );
    }

    return (
      <div name={this.props.timelineName} className={classNames(this.props.classNames, active)}>
        {renderDescendants}
      </div>
    );
  }
}