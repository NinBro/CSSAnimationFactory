import React from 'react';
import Sidebar from './../Sidebar/Sidebar.jsx';
import TimelineEditor from './../TimelineEditor/TimelineEditor';
import './Editor.scss';

export default class Editor extends React.Component {
  render () {
    return (
      <div className="Editor">
        <Sidebar position="left" data={this.props.editorData.leftSidebarData}/>
        <Sidebar position="right" {...this.props.editorData.rightSidebarData}/>
        <div className="timeline-editor-wrapper">
          <TimelineEditor {...this.props.editorData.timelineEditor} />
        </div>
      </div>
    );
  }
}