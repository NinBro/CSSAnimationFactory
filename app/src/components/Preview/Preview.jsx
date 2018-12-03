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
  renderElements(elements) {
    return elements.map((element, i) => {
      return (
        <Element
          key={i}
          {...element}
        />
      );
    });
  }

  render () {
    const { activeTimelineKeyPath, isTimelineActive, showEditor, elements, timelines, onClickPreview, updatePreviewKeyPath, handleTimelineChange } = this.props;
    // console.log('Preview - render', this.props);
    let full = '';
    if (!showEditor) {
      full = 'full';
    }
    // const timelines = this.state.timelines;
    const renderTimelines = timelines.map((timeline, i) => {
      return (
        <PreviewContent
          {...timeline}
          keyPath={[i]}
          activeTimelineKeyPath={activeTimelineKeyPath}
          isTimelineActive={isTimelineActive}
          updatePreviewKeyPath={updatePreviewKeyPath}
          handleTimelineChange={handleTimelineChange}
        />
      );
    });

    return (
      <div className={classNames('Preview preview', full)} onClick={onClickPreview} >
        {this.renderElements(elements)}
      </div>
    );
  }

}