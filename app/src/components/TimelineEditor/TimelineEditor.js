import React from 'react';
import _ from 'lodash';
import TimelineTrack from './TimelineTrack.jsx';

export default class TimelineEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter(props) {
    // Create a temp instance of props
    let newProps = _.mapValues(props, function(value) {
      return value;
    });
    newProps.active = true;

    this.props.appEvent('onMouseEnter', newProps);
  }

  onMouseLeave(props) {
    let newProps = _.mapValues(props, function(value) {
      return value;
    });
    newProps.active = false;
    this.props.appEvent('onMouseLeave', newProps);
  }

  onClick(data) {
    this.props.onClickTimelineTrack(data);
  }

  getTimelinesFlattened() {
    const timelines = this.props.timelines;
    let newTimelines = [];

    _.each(timelines, function(timeline) {
      newTimelines.push(timeline);

      // Flatten....
      if (timeline.descendants && timeline.descendants.length) {
        _.each(timeline.descendants, function(descendant) {
          descendant.type = 'secondary';
          newTimelines.push(descendant);
        });
      }
    });

    return newTimelines;
  }

  render () {
    const timelines = this.getTimelinesFlattened();
    const timelinesHTML = timelines.map((timeline) =>
      <TimelineTrack onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} {...timeline} onClick={this.onClick} />
    );

    return (
      <div className="timeline-editor">
        <div className="timelines master">
          <TimelineTrack timelineName="Master" />
        </div>
        <div className="timelines normal">
          {timelinesHTML}
        </div>
      </div>
    );
  }
}