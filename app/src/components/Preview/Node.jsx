import React from 'react';
import _ from 'lodash';
import { Tooltip } from 'antd';

export default class Node extends React.Component {
  constructor(props) {
    super(props);
  }

  renderNode(props) {
    const { type, ...nodeProps } = props;

    let node;
    switch(type) {
      case 'svg':
        node = <svg { ...nodeProps } />;
        break;
      case 'g':
        node = <g { ...nodeProps } />;
        break;
      case 'path':
        node = <path { ...nodeProps } />;
        break;
      default:
        node = <div { ...nodeProps } />;
    }

    return node;

  }

  render () {
    return this.renderNode(this.props);
  }
}