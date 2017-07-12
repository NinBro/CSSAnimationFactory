import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import CSSEditor from './CSSEditor';
import KeyframeEditorContainer from './KeyframeEditorContainer';
import { Input } from 'antd';

export default class KeyframeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // Pass it up to parent....
  handleChange(value, childProps) {
    let keyframes = this.props.keyframes;
    let keyframeIDToUpdate = _.findIndex(this.props.keyframes, function(keyframe) { return keyframe.position === childProps.id; });
    if (_.isNumber(keyframeIDToUpdate)) {

      // Update CSS
      if (!_.isUndefined(childProps.css)) {
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

  render () {
    let renderKeyframes = '';
    if (this.props.keyframes && this.props.keyframes.length) {
      const keyframes = this.props.keyframes;

      renderKeyframes = keyframes.map((keyframe) =>
        <KeyframeEditorContainer handleChange={this.handleChange} id={keyframe.position} {...keyframe} />
      );
    }

    return (
      <div className={classNames('KeyframeEditor')}>
        {renderKeyframes}
      </div>
    );
  }
}