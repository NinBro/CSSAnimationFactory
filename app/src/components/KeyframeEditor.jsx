import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import CSSEditor from './CSSEditor';
import { Input } from 'antd';

export default class KeyframeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
  }

  // Pass it up to parent....
  handleChange(value, childProps) {
    let keyframes = this.props.keyframes;
    let keyframeIDToUpdate = _.findIndex(this.props.keyframes, function(keyframe) { return keyframe.position === childProps.id; });
    if (_.isNumber(keyframeIDToUpdate)) {

      if (childProps.css) {
        keyframes[keyframeIDToUpdate].css = value;
        this.props.onChange(keyframes);
      } else if (_.isNumber(childProps.position)) {
        keyframes[keyframeIDToUpdate].position = value;
        this.props.onChange(keyframes);
      }
    }
  }

  onChangePosition(event) {
    let value = parseInt(event.target.value);
    let id = parseInt(event.target.id);
    let childProps = {
      id: id,
      position: id
    };

    this.handleChange(value, childProps);
  }

  // onChangeCSS() {

  // }



  render () {

    // renderKeyframes
    let renderKeyframes = '';
    if (this.props.keyframes && this.props.keyframes.length) {
      const keyframes = this.props.keyframes;
      // console.log(keyframes);
      renderKeyframes = keyframes.map((keyframe) =>
        <div className="keyframe-editor-container" position={keyframe.position}>
          <Input id={keyframe.position} position={keyframe.position} value={keyframe.position} onChange={this.onChangePosition} />
          <span className="title">{keyframe.position}% Keyframe</span>
          {/*<span className="title delete">x</span>*/}
          <CSSEditor id={keyframe.position} css={keyframe.css} onChange={this.handleChange} />
        </div>
      );
    }
    // console.log(this.props.keyframes);

    return (
      <div className={classNames('KeyframeEditor')}>
        <div className="">
          {renderKeyframes}
        </div>
      </div>
    );
  }
}