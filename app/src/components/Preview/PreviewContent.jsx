import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import TimelinePreview from './TimelinePreview.jsx';
import './Preview.scss';

export default class PreviewContent extends React.Component {
  constructor(props) {
    super(props);
  }

  /*
   * @param {number} depthIndex - how deep to go in the array position
   * @param {array} activeTimelineKeyPath
   * @param {array} timelineKeyPath
   * @returns {boolean}
   */
  isPreviewInactive(depthIndex, activeTimelineKeyPath, timelineKeyPath) {
    let index;
    if (!_.isUndefined(depthIndex)) {
      index = depthIndex;
    }
    else {
      index = 0;
    }

    let inactive;
    if (!_.isEmpty(activeTimelineKeyPath) && !this._keyPathsMatch(index, activeTimelineKeyPath, timelineKeyPath)) {
      inactive = true;
    } else {
      inactive = false;
    }

    // console.log('isPreviewInactive', inactive, depthIndex, activeTimelineKeyPath, timelineKeyPath);
    return inactive;
  }

  /*
   * @returns {boolean}
   */
  _keyPathsMatch(index, activeTimelineKeyPath, timelineKeyPath) {
    let match;
    if (activeTimelineKeyPath && timelineKeyPath && timelineKeyPath.length) {
      match = activeTimelineKeyPath[index] === timelineKeyPath[index];
    } else {
      match = false;
    }
    return match;
  }

  render () {
    const { active, activeTimelineKeyPath, isTimelineActive, keyPath, updatePreviewKeyPath, handleTimelineChange } = this.props;

    let inactiveStyle = '';
    if (this.isPreviewInactive(0, activeTimelineKeyPath, keyPath)) {
      inactiveStyle = 'inactive';
    }

    // renderDescendants
    let renderDescendants = '';
    if (this.props.descendants && this.props.descendants.length) {
      const descendants = this.props.descendants;
      // console.log(descendants);
      renderDescendants = descendants.map((descendant, i) => {
        const dKeyPath = [ ...keyPath, i];
        // console.log(descendant);
        const { active, ...props} = descendant;
        return (
          <TimelinePreview
            {...props}
            keyPath={dKeyPath}
            updatePreviewKeyPath={updatePreviewKeyPath}
            handleTimelineChange={handleTimelineChange}
            inactive={this.isPreviewInactive(1, activeTimelineKeyPath, dKeyPath)}
          />
        );
      });
    }

    // console.log('Preview - render', this.props);

    return (
      <div name={this.props.timelineName} className={classNames(this.props.classNames, inactiveStyle)}>
        {renderDescendants}
      </div>
    );
  }
}