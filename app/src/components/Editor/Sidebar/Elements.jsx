import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

export default class Elements extends React.Component {

  renderElements(activeKeyPath, elements, onClickElement, currentKeyPath) {
    let node;
    if (elements) {
      node = elements.map((element, i) => {
        const { keyPath, elements, name } = element;
        const elementKeyPath = currentKeyPath ? [...currentKeyPath, i] : [i];

        let active = this.isElementActive(activeKeyPath, elementKeyPath) ? 'active' : '';

        return (
          <div
            key={i}
            keyPath={elementKeyPath}
            className={ classNames('layer', active) }
            onClick={(e) => {
              e.stopPropagation();
              onClickElement(elementKeyPath);
            }}
          >
            { name }
            { this.renderElements(activeKeyPath, elements, onClickElement, elementKeyPath) }
          </div>
        );
      });
    } else {
      node = null;
    }

    return node;
  }

  /*
   * @param {array} activeKeyPath
   * @param {array} elementKeyPath
   * @returns {boolean}
   */
  isElementActive(activeKeyPath, elementKeyPath) {
    return !_.isEmpty(activeKeyPath) &&  !_.isEmpty(activeKeyPath) && this.keyPath2Str(activeKeyPath) === this.keyPath2Str(elementKeyPath);
  }

  keyPath2Str(keyPath) {
    return keyPath.join('');
  }

  render () {
    const { activeKeyPath, elements, onClickElement } = this.props;

    return (
      <div className="elements-container">
        { this.renderElements(activeKeyPath, elements, onClickElement) }
      </div>
    );
  }
}