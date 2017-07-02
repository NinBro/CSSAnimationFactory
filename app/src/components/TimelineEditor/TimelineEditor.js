import React from 'react';
import _ from 'lodash';
import TimelineTrack from './TimelineTrack.jsx';

export default class TimelineEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      timelineCount: 0,
      timelines: this.props.timelines
    }
  }

  componentWillMount() {
    let flatTimelines = this.getTimelinesFlattened();

    this.setState({
      timelines: flatTimelines
    })
  }

  onClick(data) {
    this.props.onClickTimelineTrack(data);
  }

  getTimelinesFlattened() {
    const timelines = this.state.timelines;
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
    const timelines = this.state.timelines;
    const timelinesHTML = timelines.map((timeline) =>
      <TimelineTrack {...timeline} onClick={this.onClick} />
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