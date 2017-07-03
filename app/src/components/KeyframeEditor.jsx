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
    this.onClickDeleteKeyframe = this.onClickDeleteKeyframe.bind(this);
  }

  // Pass it up to parent....
  handleChange(value, childProps) {
    let keyframes = this.props.keyframes;
    let keyframeIDToUpdate = _.findIndex(this.props.keyframes, function(keyframe) { return keyframe.position === childProps.id; });
    if (_.isNumber(keyframeIDToUpdate)) {

      // Update CSS
      if (childProps.css) {
        keyframes[keyframeIDToUpdate].css = value;
        this.props.onChange(keyframes);

      // Delete and Update Position
      } else if (_.isNumber(childProps.position)) {

        // Delete
        if (value === 'delete') {
          if (keyframeIDToUpdate > -1) {
            keyframes.splice(keyframeIDToUpdate, 1);
            // console.log(keyframes);
            this.props.onChange(keyframes);
          }
        // or Update
        } else {
          keyframes[keyframeIDToUpdate].position = value;

          // then reorder keyframes....
          let sortedKeyframes = _.sortBy(keyframes, [function(keyframe) { return keyframe.position; }]);

          this.props.onChange(sortedKeyframes);
        }

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

  onClickDeleteKeyframe(event) {
    // let value = parseInt(event.target.value);
    let value = 'delete';
    let id = parseInt(event.target.id);
    let childProps = {
      id: id,
      position: id
    };

    this.handleChange(value, childProps);
  }



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
          <span id={keyframe.position} position={keyframe.position} className="title delete" onClick={this.onClickDeleteKeyframe}>x</span>
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