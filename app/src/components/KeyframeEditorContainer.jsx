import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import CSSEditor from './CSSEditor';
import { Input } from 'antd';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/css/css';
import './../CodeMirrorOverride.scss';

export default class KeyframeEditorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.onClickDeleteKeyframe = this.onClickDeleteKeyframe.bind(this);
    this.onChangeCSS = this.onChangeCSS.bind(this);
  }

  onChangeCSS(value) {
    this.props.handleChange(value, this.props);
  }

  onChangePosition(event) {
    let value = parseInt(event.target.value);
    let id = this.props.id;
    let childProps = {
      id: id,
      position: id
    };

    this.props.handleChange(value, childProps);
  }

  onClickDeleteKeyframe(event) {
    let value = 'delete';
    let id = this.props.id;
    let childProps = {
      id: id,
      position: id
    };

    this.props.handleChange(value, childProps);
  }

  render () {
    const keyframe = this.props;
    let myModeSpec = {
      name: "css"
    };

    let options = {
      mode: myModeSpec
    };

    // CODE MIRROR
    // Have to manually re-update.... :/
    if (this.refs && this.refs.cmEditor) {
      if (this.props.css !== this.refs.cmEditor.getCodeMirror().getValue()) {
        this.refs.cmEditor.getCodeMirror().setValue(keyframe.css);
      }
    }

    return (
      <div className="keyframe-editor-container" position={keyframe.position}>
        <div className="keyframe-header">
          <Input value={keyframe.position} onChange={this.onChangePosition} />
          <span className="title">% Keyframe</span>
          <span id={keyframe.position} position={keyframe.position} className="title delete" onClick={this.onClickDeleteKeyframe}>x</span>
        </div>
        <CodeMirror ref="cmEditor" className="override-editor" value={keyframe.css} onChange={this.onChangeCSS} />
      </div>
    );
  }
}