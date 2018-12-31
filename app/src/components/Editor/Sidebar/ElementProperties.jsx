import React from 'react';
import _ from 'lodash';
import { Input, Select } from 'antd';
import CodeMirror from 'react-codemirror';

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

    return _.map(options, (option, i) => {
      const { name, keyPath } = option;
      const selectKeyPath = keyPath.join('X');
      return (
        <Select.Option value={selectKeyPath} key={i}>
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
   * CODE MIRROR
   * Have to manually re-update.... :/
   * @param {node} nodeRef
   * @param {value} string
   */
  updateCodeMirror(nodeRef, value) {
     const newValue = value || '';
    if (nodeRef) {
      if (newValue !== nodeRef.getCodeMirror().getValue()) {
        nodeRef.getCodeMirror().setValue(newValue);
      }
    }
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
    const { className, css, keyPath, name, linkedAnimationName, linkedAnimationKeyPath,
      animations, activeElementKeyPath, elements, getElementProperties, handleElementChange } = this.props;
    const selectKeyPath = !_.isEmpty(linkedAnimationKeyPath) ? linkedAnimationKeyPath.join('X') : [];

    // CODE MIRROR
    // Have to manually re-update.... :/
    // if (this.refs && this.refs.cmEditor) {
    //   if (this.props.css !== this.refs.cmEditor.getCodeMirror().getValue()) {
    //     this.refs.cmEditor.getCodeMirror().setValue(css);
    //   }
    // }
    if (this.refs && this.refs.cmEditor) {
      this.updateCodeMirror(this.refs.cmEditor, css);
    }



    return (
      <div>
        Element Name:
        <Input
          value={name}
          onChange={(value) => {this.handleChange('name', value.target.value, activeElementKeyPath, this.props, handleElementChange )}} />
        <br />
        Animation Name:
        <Select
          value={ selectKeyPath }
          style={{ width: 120 }}
          onChange={(value) => {this.handleSelectChange(value, activeElementKeyPath, this.props, handleElementChange)}}
        >
          { this.getOptions(this.getAnimations(animations)) }
        </Select>
        <br/>
        Class Name
        <Input
          value={className}
          onChange={(value) => {this.handleChange('className', value.target.value, activeElementKeyPath, this.props, handleElementChange )}} />
        <br />
        CSS
        <CodeMirror
          ref="cmEditor"
          className="override-editor"
          value={css}
          onChange={(value) => {this.handleChange('css', value, activeElementKeyPath, this.props, handleElementChange )}} />
      </div>
    );
  }
}