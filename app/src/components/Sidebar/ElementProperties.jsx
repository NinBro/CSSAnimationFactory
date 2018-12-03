import React from 'react';
import _ from 'lodash';

export default class ElementProperties extends React.Component {

  /*
   * @param {array} activeElementKeyPath
   * @param {array}  elements
   * @retuns {object}
   */
  getElementProperties(activeElementKeyPath, elements) {
    console.log('getElementProperties', activeElementKeyPath, elements);
    const target = elements[activeElementKeyPath[0]];
    let results;
    if (target) {
      if (target.elements) {
        const newKeyPath = activeElementKeyPath.slice(1);
        results = this.getElementProperties(newKeyPath, target.elements);
      } else {
        results = target;
      }
    } else {
      results = null;
    }

    return results;
  }

  render () {
    const { activeElementKeyPath, elements } = this.props;
    console.log('ElementProperties - render', this.props);
    const { name } = this.getElementProperties(activeElementKeyPath, elements);

    return (
      <div>
        Name: { name }
      </div>
    );
  }
}