import React from 'react';
import _ from 'lodash';
import TimelineTrack from './TimelineTrack.jsx';

export default class TimelineEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
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
      const newTimeline = {
        ...timeline,
        keyPath: [i]
      };

      // timeline.keyPath = [i];
      newTimelines.push(newTimeline);

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

  render () {
    console.log('TimelineEditor - render', this.props);
    const { activeTimelineKeyPath, isTimelineActive, handleChange, updateTimelineProperties, updatePreviewKeyPath, timelines } = this.props;
    const timelinesFlattened = this.getTimelinesFlattened(timelines);
    const timelinesHTML = timelinesFlattened.map((timeline, i) => {
    const { keyPath } = timeline;

      return (
        <TimelineTrack
          {...timeline}
          active={isTimelineActive(activeTimelineKeyPath, timeline)}
          key={i}
          handleChange={handleChange}
          updateTimelineProperties={updateTimelineProperties}
          updatePreviewKeyPath={updatePreviewKeyPath}
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