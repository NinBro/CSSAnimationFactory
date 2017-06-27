import React from 'react';
import './TimelineEditor.scss';
import TimelineTrack from '../TimelineTrack/TimelineTrack';

export default class TimelineEditor extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   data: this.props.data || ''
    // };
    this.onClick = this.onClick.bind(this);
  }

  onClick(data) {
    this.props.onClickTimelineTrack(data);
  }

  renderTracks() {
    const timelines = this.props.timelines;
    const bros = timelines.map((timeline) =>
      <TimelineTrack {...timeline} onClick={this.onClick} />
      // console.log('stuff', timeline, timeline.timelineName)
    );

    return (
      <div className="timelines normal">
        {bros}
      </div>
    );
  }

  render () {

    // console.log(this.props.doStuff)

    return (
      <div className="timeline-editor">
        <div className="timelines master">
          <TimelineTrack timelineName="Master" />
        </div>
        {this.renderTracks()}
      </div>
    );
  }
}