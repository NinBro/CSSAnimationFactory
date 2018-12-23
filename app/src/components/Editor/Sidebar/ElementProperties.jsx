import React from 'react';
import _ from 'lodash';
import { Input, Select } from 'antd';

export default class ElementProperties extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  /*
   * Flatten animations
   * @param {array} animations
   * @param {keypath} array
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

    const noneOption = {
      keyPath: [],
      name: 'None'
    };

    const options = [noneOption, ...animations];

    return _.map(options, (option) => {
      const { name, keyPath } = option;
      const selectKeyPath = keyPath.join('X');
      return (
        <Select.Option value={selectKeyPath}>
          { name }
        </Select.Option>
      );
    });
  }

  /*
   * @param {string} value
   * @param {array} keypath
   * @param {object} props
   * @param {function} action
   */
  handleSelectChange(value, keyPath, props, action) {
    console.log('handleSelectChange', value);
    const newProps = _.cloneDeep(props);

    const linkedAnimationKeyPath = value.split('X');
    newProps.linkedAnimationKeyPath = linkedAnimationKeyPath;

    action(keyPath, newProps);
  }

  /*
   * @param {string} value
   * @param {array} keypath
   * @param {object} props
   * @param {function} action
   */
  handleChange(key, value, keyPath, props, action) {
    console.log('handleChange', value);
    const newProps = _.cloneDeep(props);
    newProps[key] = value;
    action(keyPath, newProps);
  }

  render () {
    const { className, keyPath, name, linkedAnimationName, linkedAnimationKeyPath, animations, activeElementKeyPath, elements, getElementProperties, handleElementChange } = this.props;
    const selectKeyPath = !_.isEmpty(linkedAnimationKeyPath) ? linkedAnimationKeyPath.join('X') : [];

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
        Class Name
        <Input value={className} onChange={(value) => {this.handleChange('className', value.target.value, activeElementKeyPath, this.props, handleElementChange )}} />
      </div>
    );
  }
}