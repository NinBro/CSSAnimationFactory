import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import './TimelineTrack.scss';
import Notch from './Notch.jsx';

export default class TimelineTrack extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.updateTimelineProperties = this.updateTimelineProperties.bind(this);
  }

  // Notch(props) {

  //     // Show label for each second
  //     let i;
  //     let markers = {};
  //     let timelineLabel = '';
  //     var duration = parseInt(props.animationProperties.duration);
  //     var timeSegment = 100 / duration;
  //     for (i = 0; i < duration + 1; i++) {
  //       markers[timeSegment * i] = i + 's';
  //     }

  //     if (props.timelineName === 'Master' && !_.isEmpty(markers[props.position])) {
  //       timelineLabel = (
  //         <div className="time-label">
  //           {markers[props.position]}
  //         </div>)
  //     }


  //   return  (
  //     <div is class="notch" position={props.position}>
  //       {timelineLabel}
  //     </div>
  //   )
  // }

  getNotches(props) {
    let notchCnt = 101; // 0-100 on %
    let notches = [];
    let i;
    for (i = 0; i < notchCnt; i++) {
      notches.push(<Notch position={i} {...props} />);
    }

    return notches;
    // return  null;
  }

  // Show config menu....
  onClick() {
    this.props.onClick(this.props);
  }

  /*
   * {object} e - event
   * {object} props
   */
  updateTimelineProperties(e, props) {
    e.stopPropagation();
    this.props.updateTimelineProperties(props, this.props);
  }


  render () {
    const { active, animationProperties, timelineProperties, keyPath, updatePreviewKeyPath, name } = this.props;


    let extraClasses = '';
    if (this.props.type && this.props.type === 'secondary') {
      extraClasses = 'secondary';
    }

    let activeClass = '';
    if (active) {
      activeClass = 'active';
    }

    // console.log('TimelineTrack - render', this.props);

    return (
      <div
        className={classNames('TimelineTrack timeline-track', extraClasses, activeClass)}
        name={animationProperties.name}
        onClick={this.onClick}
        onMouseEnter={() => {updatePreviewKeyPath(keyPath)}}
        onMouseLeave={() => {updatePreviewKeyPath([])}}
      >
        <div className="animation-key"/>
        <div className="notches">
          {this.getNotches(animationProperties)}
        </div>
        <div className="animation-key"></div>
      </div>
    );
  }
}