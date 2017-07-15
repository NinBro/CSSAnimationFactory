import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import './TimelineTrack.scss';

export default class TimelineTrack extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  Notch(props) {

      // Show label for each second
      let i;
      let markers = {};
      let timelineLabel = '';
      var duration = parseInt(props.animationProperties.duration);
      var timeSegment = 100 / duration;
      for (i = 0; i < duration + 1; i++) {
        markers[timeSegment * i] = i + 's';
      }

      if (props.timelineName === 'Master' && !_.isEmpty(markers[props.position])) {
        timelineLabel = (
          <div className="time-label">
            {markers[props.position]}
          </div>)
      }


    return  (
      <div is class="notch" position={props.position}>
        {timelineLabel}
      </div>
    )
  }

  getNotches() {
    let notchCnt = 101; // 0-100 on %
    let notches = [];
    let i;
    for (i = 0; i < notchCnt; i++) {
      notches.push(<this.Notch position={i} {...this.props} />);
    }

    return notches;
  }

  onMouseEnter() {
    // console.log('ITS ENTER')
    this.props.onMouseEnter(this.props);
  }

  onMouseLeave() {
    // console.log('ITS LEAVE');
    this.props.onMouseLeave(this.props);
  }

  // Show config menu....
  onClick() {
    // console.log('cliiiick', this.props);
    this.props.onClick(this.props);
  }


  render () {
    let extraClasses = '';
    if (this.props.type && this.props.type === 'secondary') {
      extraClasses = 'secondary';
    }

    console.log(this.props)

    return (
      <div className={classNames('TimelineTrack timeline-track', extraClasses)} name={this.props.timelineName} onClick={this.onClick}>
        <div className="timeline-meta">
          <input type="text" className="name" value={this.props.timelineName} />
        </div>
        <div className="timeline" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          <div className="animation-key"/>
          <div className="notches">
            {this.getNotches()}
          </div>
          <div className="animation-key"></div>
        </div>
      </div>
    );
  }
}