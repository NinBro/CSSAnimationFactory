import React from 'react';
import _ from 'lodash';

export default class Element extends React.Component {

  /*
   * @param {array} elements
   * @returns {node}
   */
  renderElements(elements) {
    let nodes;
    // console.log('renderElements', elements);
    if (_.isObject(elements)) {
      nodes = elements.map((element, i) => {
        const { elements } = element;
        return (
          <div
            key={i}
            {...element}
          >
            {this.renderElements(elements)}
          </div>
        );
      });
    } else {
      nodes = null;
    }

    return nodes;

  }

  render () {
    const { name, elements } = this.props;
    return (
      <div name={name} >
        { this.renderElements(elements) }
      </div>
    );
  }
}