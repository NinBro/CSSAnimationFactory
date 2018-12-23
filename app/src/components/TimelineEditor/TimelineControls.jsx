import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

export default class TimelineControls extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.updateTimelineProperties = this.updateTimelineProperties.bind(this);
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

  getNotches(props) {
    let notchCnt = 101; // 0-100 on %
    let notches = [];
    let i;
    for (i = 0; i < notchCnt; i++) {
      notches.push(<this.Notch position={i} {...props} />);
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

  /*
   * @param {object} timelineProperties
   * @returns {node}
   */
  renderAnimationStateBtn(timelineProperties) {
    let element = null;
    if (timelineProperties && timelineProperties.playState && timelineProperties.playState === 'paused') {
      element = <span onClick={(e) => {this.updateTimelineProperties(e, { playState: 'running'})}}>Play</span>;
    } else {
      element = <span onClick={(e) => {this.updateTimelineProperties(e, { playState: 'paused'})}}>Pause</span>;
    }

    return element;
  }

  /*
   * @param {object} timelineProperties
   * @returns {node}
   */
  renderVisibilityBtn(timelineProperties) {
    let element = null;
    if (timelineProperties && timelineProperties.visible === false) {
      element = <span onClick={(e) => {this.updateTimelineProperties(e, {visible: true})}}>Show</span>;
    } else {
      element = <span onClick={(e) => {this.updateTimelineProperties(e, {visible: false})}}>Hide</span>;
    }

    return element;
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

    console.log('TimelineTrack - render', this.props);

    return (
      <div
        className="timeline-controls" >
        <div className={classNames("timeline-meta", activeClass)}>
          <input type="text" className="name" value={name} />
          { this.renderAnimationStateBtn(timelineProperties) }
          { this.renderVisibilityBtn(timelineProperties) }
        </div>
      </div>
    );
  }
}