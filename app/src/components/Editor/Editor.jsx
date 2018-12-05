import React from 'react';
import Sidebar from './Sidebar/Sidebar.jsx';
import TimelineEditor from './../TimelineEditor/TimelineEditor';
import './Editor.scss';

export default class Editor extends React.Component {
  render () {
    const { activeElementKeyPath, activeTimelineKeyPath, appEvent, animations, elements, showEditor, rightSidebarData,
      getMasterTimeline, renderAnimationCSS, handleChange, updateTimelineProperties,
      isTimelineActive, updatePreviewKeyPath, onClickTimelineTrack, timelines } = this.props;

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
          view: 'elements',
          activeElementKeyPath,
          elements,
          animations
        },
        rightSidebarData: {
          onChange: handleChange,
          elements,
          updateTimelineProperties,
          type: rightSidebarData.type,
          data: rightSidebarData.data,
          active: true,
          activeElementKeyPath
        },
        timelineEditor: {
          activeTimelineKeyPath,
          isTimelineActive,
          updateTimelineProperties,
          updatePreviewKeyPath,
          appEvent,
          onClickTimelineTrack,
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