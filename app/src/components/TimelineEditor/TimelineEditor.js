import React from 'react';
import './TimelineEditor.scss';
import TimelineTrack from '../TimelineTrack/TimelineTrack';

export default class TimelineEditor extends React.Component {


  render () {

    this.props.doStuff();

    return (
      <div className="timeline-editor">
        <div className="timelines master">
          <TimelineTrack name="Master" />
        </div>
        <div className="timelines normal">
          <TimelineTrack name="another" />
          <TimelineTrack name="asdsadasdasd" />
        </div>
      </div>
    );
  }
}