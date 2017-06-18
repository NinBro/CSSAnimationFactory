import React from 'react';
import './TimelineEditor.scss';
import TimelineTrack from '../TimelineTrack/TimelineTrack';

export default class TimelineEditor extends React.Component {


  renderTracks() {
    // const numbers = ['aaaa', 'bbbbbbbb'];
    const numbers = this.props.doStuff;
    const listItems = numbers.map((number) =>
      <TimelineTrack name={number} />
    );
    return (
      <div className="timelines normal">
        {listItems}
      </div>
    );
  }

  render () {

    console.log(this.props.doStuff)

    return (
      <div className="timeline-editor">
        <div className="timelines master">
          <TimelineTrack name="Master" />
        </div>
        {this.renderTracks()}
      </div>
    );
  }
}