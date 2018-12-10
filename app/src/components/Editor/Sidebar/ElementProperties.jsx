import React from 'react';
import _ from 'lodash';
import { Select } from 'antd';

export default class ElementProperties extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }


  /*
   * @returns [array]
   */
  getAnimations(animations, keyPath) {
    let animationsFlat = [];
    _.each(animations, (animation, i) => {
      let newKeyPath = keyPath ? [...keyPath, i] : [i];
      let newAnimation = {keyPath: newKeyPath, ...animation};
      if (animation.animations) {
         animationsFlat.push(newAnimation, ...this.getAnimations(newAnimation.animations, newKeyPath));
      } else {
        animationsFlat.push(newAnimation);
      }
    });

    return animationsFlat;
  }

  /*
   * {array} animations
   */
  getOptions(animations) {
    // console.log('getOptions', animations);
    return _.map(animations, (animation) => {
      const { name, keyPath } = animation;
      const selectKeyPath = keyPath.join('X');
      return (
        <Select.Option value={selectKeyPath}>
          { name }
        </Select.Option>
      );
    });
  }

  handleSelectChange(value, keyPath, props, action) {
    console.log('handleSelectChange', value);
    const newProps = _.cloneDeep(props);

    const linkedAnimationKeyPath = value.split('X');
    newProps.linkedAnimationKeyPath = linkedAnimationKeyPath;

    action(keyPath, newProps);
  }

  render () {
    const { keyPath, name, linkedAnimationName, linkedAnimationKeyPath, animations, activeElementKeyPath, elements, getElementProperties, handleElementChange } = this.props;
    const selectKeyPath = linkedAnimationKeyPath.join('X');


    // const elementProperties = getElementProperties(activeElementKeyPath, elements);
    // console.log('ElementProperties - render', this.props);


    // console.log('getAnimations', this.getAnimations(animations));

    // const { keyPath, name, linkedAnimationName } = this.props;
// onChange={() => {handleElementChange(keyPath, elementProperties)}}
    return (
      <div>
        Element Name: { name }
        <br />
        Animation Name:
        <Select
          value={ selectKeyPath }
          style={{ width: 120 }}
          onChange={(value) => {this.handleSelectChange(value, activeElementKeyPath, this.props, handleElementChange)}}
        >
          { this.getOptions(this.getAnimations(animations)) }
        </Select>
      </div>
    );
  }
}