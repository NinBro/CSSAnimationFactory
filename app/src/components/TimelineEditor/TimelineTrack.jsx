import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import './TimelineTrack.scss';

export default class TimelineTrack extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.updateTimelineProperties = this.updateTimelineProperties.bind(this);
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


    // const mergedData = _.assign({}, this.props, {active: true});


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
    const { active, timelineProperties } = this.props;


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
        className={classNames('TimelineTrack timeline-track', extraClasses, activeClass)}
        name={this.props.timelineName}
        onClick={this.onClick}
      >
        <div className={classNames("timeline-meta", activeClass)}>
          <input type="text" className="name" value={this.props.timelineName} />
          { this.renderAnimationStateBtn(timelineProperties) }
          { this.renderVisibilityBtn(timelineProperties) }
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