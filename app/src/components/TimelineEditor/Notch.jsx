import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

export default class Notch extends React.Component {


  /*
   * @param {number} notchPosition
   * @param {array} keyframes
   * @returns {boolean}
   */
  isNotchKeyframe(notchPosition, keyframes) {
    const { position } = keyframes;
    const match = _.filter(keyframes, ['position', notchPosition]);

    return !_.isEmpty(match);
  }

  render() {
    const { position, keyframes, ...props } = this.props;

      // Show label for each second
      let i;
      let markers = {};
      let timelineLabel = '';
      var duration = parseInt(props.animationProperties.duration);
      var timeSegment = 100 / duration;
      for (i = 0; i < duration + 1; i++) {
        markers[timeSegment * i] = i + 's';
      }

      if (props.timelineName === 'Master' && !_.isEmpty(markers[position])) {
        timelineLabel = (
          <div className="time-label">
            {markers[position]}
          </div>)
      }

      let keyframe;

      const isNotchKeyframe = this.isNotchKeyframe(position, keyframes);
      if (isNotchKeyframe) {
        keyframe = 'keyframe';
      }


      return (
        <div is class={classNames('notch', keyframe)} position={position}>
          {timelineLabel}
        </div>
      );
  }

}