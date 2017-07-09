import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AnimationProperties from './AnimationProperties';
import CSSEditor from './../CSSEditor';
import KeyframeEditor from './../KeyframeEditor';
import './Sidebar.scss';
import { Button } from 'antd';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // Pass it up to parent....
  handleChange(value) {
    this.props.onChange(value);
  }

  render () {
    let data = this.props.data;
    let positionClass = this.props.position ? this.props.position + '-panel' : '';
    let stateClass = this.props.active ? 'active' : '';

    let content = null;
    if (data && data.timeline) {
      content = (
        <AnimationProperties {...data.timeline} onChange={this.handleChange} />
      );
    } else if (this.props.type === 'editor') {
      content = (
        <div>
          <CSSEditor data={this.props.data} onChange={this.handleChange} />
        </div>
        );
    } else {
      content = (
        <div className="content-container compiled-css">
          {data}
        </div>
      )
    }

    return (
      <div className={classNames('Sidebar sidebar', positionClass, stateClass)}>
        {content}
      </div>
    );
  }
}

CSSEditor.propTypes = {
  // If sidebar is active or not
  active: PropTypes.string,

  // Any kind of data to pass through
  data: PropTypes.object,

  // Callback onChange results to parent
  onChange: PropTypes.func
};