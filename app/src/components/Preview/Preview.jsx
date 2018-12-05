import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import PreviewContent from './PreviewContent.jsx';
import Element from './Element.jsx';
import './Preview.scss';

export default class Preview extends React.Component {

  /*
   * @param {array} elements
   */
  // renderElements(activeKeyPath, elements) {
  //   return elements.map((element, i) => {
  //     const elementKeyPath = currentKeyPath ? [...currentKeyPath, i] : [i];
  //     return (
  //       <Element
  //         key={i}
  //         {...element}
  //       />
  //     );
  //   });
  // }

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
    // const timelines = this.state.timelines;
    // const renderTimelines = timelines.map((timeline, i) => {
    //   return (
    //     <PreviewContent
    //       {...timeline}
    //       keyPath={[i]}
    //       activeTimelineKeyPath={activeKeyPath}
    //       isTimelineActive={isTimelineActive}
    //       updatePreviewKeyPath={updatePreviewKeyPath}
    //       handleTimelineChange={handleTimelineChange}
    //     />
    //   );
    // });

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