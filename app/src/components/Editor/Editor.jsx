import React from 'react';
import Sidebar from './Sidebar/Sidebar.jsx';
import TimelineEditor from './../TimelineEditor/TimelineEditor';
import './Editor.scss';

export default class Editor extends React.Component {
  render () {
    const { activeElementKeyPath, getElementProperties, getAnimationProperties, activeTimelineKeyPath, appEvent, animations, elements, showEditor, rightSidebarData,
      getMasterTimeline, renderAnimationCSS, handleChange, updateTimelineProperties,
      isTimelineActive, updatePreviewKeyPath, onClickTimelineTrack, timelines, handleElementChange } = this.props;

    console.log('Editor - render', this.props);

    let editorNode;
    if (showEditor) {
      let leftSidebarData = '';
      // If timeline active show its css
      if (rightSidebarData.data && rightSidebarData.data.timeline) {
        leftSidebarData = renderAnimationCSS([rightSidebarData.data.timeline], 'preview');
      // Otherwise show global css
      } else {
        leftSidebarData = renderAnimationCSS(timelines, 'preview');
      }

      let editorData = {
        // leftSidebarData: leftSidebarData,
        leftSidebarData: {
          ...this.props,
          view: 'elements'
        },
        rightSidebarData: {
          onChange: handleChange,
          animations,
          elements,
          updateTimelineProperties,
          type: rightSidebarData.type,
          data: rightSidebarData.data,
          active: true,
          activeElementKeyPath,
          getElementProperties,
          getAnimationProperties,
          handleElementChange
        },
        timelineEditor: {
          activeTimelineKeyPath,
          isTimelineActive,
          updateTimelineProperties,
          updatePreviewKeyPath,
          appEvent,
          onClickTimelineTrack,
          getAnimationProperties,
          animations,
          elements,
          timelines,
          masterTimeline: getMasterTimeline(timelines)
        }
      };

      editorNode = (
        <div className="Editor">
          <Sidebar
            position="left"
            {...editorData.leftSidebarData} />
          <Sidebar
            position="right"
            view="elementProperties"
            {...editorData.rightSidebarData} />
          <div className="timeline-editor-wrapper">
            <TimelineEditor {...editorData.timelineEditor} />
          </div>
        </div>
      );
    } else {
      editorNode = null;
    }

    return editorNode;
  }
}