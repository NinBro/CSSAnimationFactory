import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import KeyframeEditor from '../../KeyframeEditor';
import { Button } from 'antd';
import { Input } from 'antd';

export default class AnimationProperties extends React.Component {
  constructor(props) {
    super(props);
    this.updateTimelineProperties = this.updateTimelineProperties.bind(this);
    this.onKeyframeEditorChange = this.onKeyframeEditorChange.bind(this);
    this.onClickAddKeyframe = this.onClickAddKeyframe.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  getProps() {
    // Create a temp instance of props
    return  _.mapValues(this.props, function(value) {
      return value;
    });
  }

  // Pass it up to parent....
  onKeyframeEditorChange(value) {
    const {keyPath} = this.props;
    let newData = null;

    // Create a temp instance of props
    newData = this.getProps();

    newData.keyframes = value;
    // newData.keyframes = value;
    this.props.onChange(keyPath, 'animation', newData);
  }

  onValueChange(event) {
    const {keyPath} = this.props;
    let value = _.isNumber(event.target.value) ? parseInt(event.target.value) : event.target.value;
    let id = _.isNumber(event.target.id) ? parseInt(event.target.id) : event.target.id;
    let newData = this.getProps();

    switch(id) {
      case 'classNames':
        newData.classNames = value;
        break;
      case 'duration':
        newData.animationProperties.duration = value;
        break;
      case 'iteration':
        newData.animationProperties.iteration = value;
        break;
      case 'timingFunction':
        newData.animationProperties.timingFunction = value;
        break;
      case 'direction':
        newData.animationProperties.animationDirection = value;
    }

    this.props.onChange(keyPath, 'animation', newData);
  }

  // TODO
  // 1) Do not allow duplicates
  // 2) Add keyframe to nearest after first one


  /*
   * @returns {object} updated timeline props
   */
  onClickAddKeyframe() {
    const {keyPath} = this.props;
    // console.log('hiiiii');

    let newData = null;

    // Create a temp instance of props
    newData = this.getProps();

    if (newData.keyframes) {
      newData.keyframes.push({
        css: '', // EMPTY
        position: 50
      });
    } else {
      newData.keyframes = [{
        css: '', // EMPTY
        position: 50
      }];
    }


    let sortedKeyframes = _.sortBy(newData.keyframes, [function(keyframe) { return keyframe.position; }]);

    newData.keyframes = sortedKeyframes;
    console.log('onClickAddKeyframe', newData);

    // newData.keyframes = value;
    this.props.onChange(keyPath, 'animation', newData);
  }

  // pauseAnimation() {
  //   this.props.updateTimelineProperties(


  //     () => {this.updateTimelineProperties({ playState: 'paused'})}

  //   };
  // }

  // playAnimation() {
  //   this.props.updateTimelineProperties(() => {this.updateTimelineProperties({ playState: 'running'})}};
  // }


  /*
   * {object} props
   */
  updateTimelineProperties(props) {
    this.props.updateTimelineProperties(props, this.props);
  }

  /*
   * @param {object} timelineProperties
   * @returns {node}
   */
  renderAnimationStateBtn(timelineProperties) {
    let element = null;
    if (timelineProperties && timelineProperties.playState && timelineProperties.playState === 'paused') {
      element = <Button onClick={() => {this.updateTimelineProperties({ playState: 'running'})}}>Play</Button>;
    } else {
      element = <Button onClick={() => {this.updateTimelineProperties({ playState: 'paused'})}}>Pause</Button>;
    }

    return element;
  }

  /*
   * @param {object} timelineProperties
   * @returns {node}
   */
  renderVisibilityBtn(timelineProperties) {
    let element = null;
    if (timelineProperties && timelineProperties.visible === false) {
      element = <Button onClick={() => {this.updateTimelineProperties({visible: true})}}>Show</Button>;
    } else {
      element = <Button onClick={() => {this.updateTimelineProperties({visible: false})}}>Hide</Button>;
    }

    return element;
  }

  onClickDeleteKeyframe() {

  }

  render () {
    const { animationProperties, timelineProperties } = this.props;
    // console.log('AnimationProperties - render', this.props);

    const duration = animationProperties && animationProperties.duration || '';
    const iteration = animationProperties && animationProperties.iteration || '';
    const timingFunction = animationProperties && animationProperties.timingFunction || '';
    const animationDirection = animationProperties && animationProperties.animationDirection || '';

    return (
      <div className="content-container animation-properties">
        <div>
          {this.props.timelineName}
          { this.renderAnimationStateBtn(timelineProperties) }
          { this.renderVisibilityBtn(timelineProperties) }
        </div>
        <Button onClick={this.onClickAddKeyframe}>Add Keyframe</Button>
        <div>
          <div>Class Names</div>
          <Input id="classNames" value={this.props.classNames} onChange={this.onValueChange} />
        </div>
        <div>
          <div>Duration </div>
          <Input
            id="duration"
            value={duration}
            onChange={this.onValueChange} />
        </div>
        <div>
          <div>Iteration</div>
          <Input id="iteration" value={iteration} onChange={this.onValueChange} />
        </div>
        <div>
          <div>Timing-Function</div>
          <Input id="timingFunction" value={timingFunction} onChange={this.onValueChange} />
        </div>
        <div>
          <div>Direction </div>
          <Input id="direction" value={animationDirection} onChange={this.onValueChange} />
        </div>
        <KeyframeEditor keyframes={this.props.keyframes} onChange={this.onKeyframeEditorChange}  />
      </div>
    );
  }
}

AnimationProperties.propTypes = {
  // These represent the props from the timeline provided
  props: PropTypes.object
};