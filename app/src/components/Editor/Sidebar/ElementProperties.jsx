import React from 'react';
import _ from 'lodash';
import { Select } from 'antd';

export default class ElementProperties extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  getAnimations(animations) {
    let names = [];
    _.each(animations, (animation) => {
      if (animation.animations) {
         names.push(animation.name, ...this.getAnimations(animation.animations));
      } else {
        names.push(animation.name);
      }
    });

    return names;
  }

  getOptions(names) {
    return _.map(names, (name) => {
      return (
        <Select.Option value={name}>
          {name}
        </Select.Option>
      );
    });
  }

  handleSelectChange(value, keyPath, props, action) {
    console.log('handleSelectChange', value);
    const newProps = _.cloneDeep(props);

    newProps.linkedAnimationName = value;

    action(keyPath, newProps);
  }

  render () {
    const { animations, activeElementKeyPath, elements, getElementProperties, handleElementChange } = this.props;
    const elementProperties = getElementProperties(activeElementKeyPath, elements);
    console.log('ElementProperties - render', this.props);
    console.log(this.getAnimations(animations));

    const { keyPath, name, linkedAnimationName } = elementProperties;
// onChange={() => {handleElementChange(keyPath, elementProperties)}}
    return (
      <div>
        Name: { name }
          <Select
            value={ linkedAnimationName }
            style={{ width: 120 }}
            onChange={(value) => {this.handleSelectChange(value, activeElementKeyPath, elementProperties, handleElementChange)}}
          >
            { this.getOptions(this.getAnimations(animations)) }
          </Select>
      </div>
    );
  }
}