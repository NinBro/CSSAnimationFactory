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

    this.props.appEvent('onMouseEnter', newProps);
  }

  onMouseLeave(props) {
    let newProps = _.mapValues(props, function(value) {
      return value;
    });

    this.props.appEvent('onMouseLeave', newProps);
  }

  onClick(data, keyPath) {
    this.props.onClickTimelineTrack(data);
  }

  /*
   * @param {array} timelines
   * @returns {array}
   */
  getTimelinesFlattened(timelines) {
    let newTimelines = [];

    _.each(timelines, (timeline, i) => {

      timeline.keyPath = [i];
      newTimelines.push(timeline);

      // Flatten....
      if (timeline.descendants && timeline.descendants.length) {
        _.each(timeline.descendants, (descendant, j) => {
          const newTimeline = {
            ...descendant,
            type: 'secondary',
            keyPath: [i, j]
          };
          // descendant.type = 'secondary';
          // descendant.keyPath = [i, j];
          newTimelines.push(newTimeline);
        });
      }
    });

    return newTimelines;
  }

  /*
   * @param {array} activeKeyPAth
   * @returns {boolean}
   */
  isActive(activeKeyPath, timeline) {
    // _.filter(activeKeyPath, (key, i) => { return key });


    let isActive;
    if (_.isArray(activeKeyPath) && timeline && _.isArray(timeline.keyPath)) {
      isActive = activeKeyPath.join('') === timeline.keyPath.join('');
    } else {
      isActive = false;
    }

    console.log('isActive', isActive, activeKeyPath, timeline);
    return isActive;

  }

  render () {
    console.log('TimelineEditor - render', this.props);
    const { activeTimelineKeyPath, handleChange, updateTimelineProperties, timelines } = this.props;
    const timelinesFlattened = this.getTimelinesFlattened(timelines);
    const timelinesHTML = timelinesFlattened.map((timeline, i) => {
    const { keyPath } = timeline;

      return (
        <TimelineTrack
          {...timeline}
          active={this.isActive(activeTimelineKeyPath, timeline)}
          key={i}
          handleChange={handleChange}
          updateTimelineProperties={updateTimelineProperties}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onClick={(data) => {this.onClick(data, keyPath)}}
        />
        )
      }
    );

    return (
      <div className="timeline-editor">
        <div className="timelines master">
          <TimelineTrack {...this.props.masterTimeline} />
        </div>
        <div className="timelines normal">
          {timelinesHTML}
        </div>
      </div>
    );
  }
}