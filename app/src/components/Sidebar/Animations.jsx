import React from 'react';
import _ from 'lodash';

export default class Animations extends React.Component {

  renderAnimations(animations) {
    let node;
    if (animations) {
      node = _.map(animations, (animation, i) => {
        const { animations, name } = animation;
        return (
          <div
            key={i}
          >
            { name }
            { this.renderAnimations(animations) }
          </div>
        );
      });
    } else {
      node = null;
    }

    return node;
  }

  render () {
    const { animations } = this.props;

    return (
      <div>
        { this.renderAnimations(animations) }
      </div>
    );
  }
}