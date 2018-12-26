import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Element from './Element.jsx';
import './Preview.scss';

export default class Preview extends React.Component {

  /*
   * Make all previews inactive except the one that has been selected.
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
   * @param {number} index
   * @param {array} activeTimelineKeyPath
   * @param {array} timelineKeyPath
   * @returns {boolean}
   */
  _keyPathsMatch(index, activeTimelineKeyPath, timelineKeyPath) {
    let match;
    if (activeTimelineKeyPath && timelineKeyPath && timelineKeyPath.length) {
      match = activeTimelineKeyPath[index] === timelineKeyPath[index] || this.isTargetDescendent(index, activeTimelineKeyPath, timelineKeyPath);
    } else {
      match = false;
    }
    return match;
  }

  /*
   * @param {number} index
   * @param {array} activeTimelineKeyPath
   * @param {array} timelineKeyPath
   * @returns {boolean}
   */
  isTargetDescendent(index, activeTimelineKeyPath, timelineKeyPath) {
    let match;
    if (timelineKeyPath.length > activeTimelineKeyPath.length) {
      const lengthDiff = timelineKeyPath.length - activeTimelineKeyPath.length;
      const activeTKP2Str = activeTimelineKeyPath.join('');
      const tKP2Str = timelineKeyPath.join('');
      const tKP2StrTrimmed = tKP2Str.substring(0, tKP2Str.length - lengthDiff);
      match = activeTKP2Str === tKP2StrTrimmed;
    } else {
      match = false;
    }
    return match;
  }

  /*
   * @param {object} props
   * @param {array} props.activeKeyPath
   * @param {array} props.elements
   * @param {array} props.currentKeyPath
   * @param {number} props.depthIndex
   * @returns {node}
   */
  renderElements(props) {
    const { activeKeyPath, elements, currentKeyPath, depthIndex, ...remaining } = props;
    let currentDepth = depthIndex || 0;
    let node;
    if (elements) {
      node = elements.map((element, i) => {
        const { className, keyPath, elements, name } = element;
        const elementKeyPath = currentKeyPath ? [...currentKeyPath, i] : [i];

        // let active = this.isElementActive(activeKeyPath, elementKeyPath) ? 'active' : '';

        let inactiveStyle = '';
        if (this.isPreviewInactive(currentDepth, activeKeyPath, elementKeyPath)) {
          inactiveStyle = 'inactive';
        }

        return (
          <Element
            { ...element }
            { ...remaining }
            key={i}
            keyPath={elementKeyPath}
            className={ classNames(inactiveStyle, className) }
          >
            { this.renderElements({activeKeyPath, elements, currentKeyPath: elementKeyPath, depthIndex: currentDepth + 1, ...remaining}) }
          </Element>
        );
      });
    } else {
      node = null;
    }

    return node;
  }

  isElementActive(activeKeyPath, elementKeyPath) {
    return !_.isEmpty(activeKeyPath) &&  !_.isEmpty(activeKeyPath) && this.keyPath2Str(activeKeyPath) === this.keyPath2Str(elementKeyPath);
  }

  keyPath2Str(keyPath) {
    return keyPath.join('');
  }


  render () {
    const { showEditor, onClickPreview, ...props } = this.props;
    // console.log('Preview - render', this.props);
    let full = '';
    if (!showEditor) {
      full = 'full';
    }

    return (
      <div
        className={classNames('Preview preview', full)}
        onClick={onClickPreview}
      >
        { this.renderElements({...props}) }
      </div>
    );
  }

}