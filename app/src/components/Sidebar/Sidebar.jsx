import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AnimationProperties from './AnimationProperties';
import CSSEditor from './../CSSEditor';
import KeyframeEditor from './../KeyframeEditor';
import { Button } from 'antd';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeline: null
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    if (this.props.timeline) {
      this.setState({
        timeline: this.props.timeline
      });
    }
  }

  // Pass it up to parent....
  handleChange(value) {
    this.props.onChange(value);
    // if (this.props.data.timeline) {
    //   let newData = null;

    //   // Create a temp instance of props
    //   newData = _.mapValues(this.props.data.timeline, function(value) {
    //     return value;
    //   });

    //   newData.keyframes = value;
    //   // newData.keyframes = value;
    //   this.props.onChange(newData);
    // }
  }

  render () {
    let data = this.props.data;
    let positionClass = this.props.position ? this.props.position + '-panel' : '';
    let stateClass = this.props.active ? 'active' : '';

    let content = null;
    if (data && data.timeline) {

      content = (
        // <div>
          // {data.timeline.timelineName}
          // <br/><br/>
          // <Button>Add Keyframe</Button>
          <AnimationProperties {...data.timeline} onChange={this.handleChange} />
          // <br/><br/>
          // <KeyframeEditor keyframes={data.timeline.keyframes} onChange={this.handleChange}  />
        // </div>
        );
    } else if (this.props.type === 'editor') {
      content = (
        <div>
          <CSSEditor data={this.props.data} onChange={this.handleChange} />
        </div>
        );
    }

  	// let data = this.props.data;
    return (
      <div className={classNames('sidebar', positionClass, stateClass)}>
        <div className="content-container compiled-css">
          {content}
        </div>
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