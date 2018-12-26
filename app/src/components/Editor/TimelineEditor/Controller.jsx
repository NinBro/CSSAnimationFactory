import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import TimelineControls from './TimelineControls.jsx';

export default class Controller extends React.Component {



  renderControls(timelines) {
    return _.map(timelines, (timeline) =>{
      const { name } = timeline;
      return <TimelineControls {...timeline} />;
    });
  }


  render () {
    const { timelines } = this.props;
    // console.log('TimelineTrack - render', this.props);

    return (
      <div
        className="controller" >
        CONTROLLER
        {this.renderControls(timelines)}

      </div>
    );
  }
}