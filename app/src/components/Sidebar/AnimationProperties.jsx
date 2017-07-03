import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import KeyframeEditor from './../KeyframeEditor';
import { Button } from 'antd';

export default class AnimationProperties extends React.Component {
  constructor(props) {
    super(props);
    this.onKeyframeEditorChange = this.onKeyframeEditorChange.bind(this);
    this.onClickAddKeyframe = this.onClickAddKeyframe.bind(this);
  }
  // Pass it up to parent....
  // handleChange(value) {

  //   if (this.props) {
  //   let newData = null;

  //   // Create a temp instance of props
  //   newData = _.mapValues(this.props, function(value) {
  //     return value;
  //   });

  //   newData.keyframes = value;
  //   // newData.keyframes = value;
  //   this.props.onChange(newData);
  //   }
  // }

  // Pass it up to parent....
  onKeyframeEditorChange(value) {
    let newData = null;

    // Create a temp instance of props
    newData = _.mapValues(this.props, function(value) {
      return value;
    });

    newData.keyframes = value;
    // newData.keyframes = value;
    this.props.onChange(newData);
  }

  onClickAddKeyframe() {
    console.log('hiiiii');

    let newData = null;

    // Create a temp instance of props
    newData = _.mapValues(this.props, function(value) {
      return value;
    });

    newData.keyframes.push({
      css: '', // EMPTY
      position: 50
    });

    let sortedKeyframes = _.sortBy(newData.keyframes, [function(keyframe) { return keyframe.position; }]);

    newData.keyframes = sortedKeyframes;
    // console.log(newData);

    // newData.keyframes = value;
    this.props.onChange(newData);
  }

  onClickDeleteKeyframe() {

  }

  render () {

    // console.log(this.props);
    return (
      <div>
        {this.props.timelineName}
        <br/><br/>
        <Button onClick={this.onClickAddKeyframe}>Add Keyframe</Button>
        <br/><br/>
        <KeyframeEditor keyframes={this.props.keyframes} onChange={this.onKeyframeEditorChange}  />
      </div>
    );
  }
}

AnimationProperties.propTypes = {
  // These represent the props from the timeline provided
  props: PropTypes.object
};