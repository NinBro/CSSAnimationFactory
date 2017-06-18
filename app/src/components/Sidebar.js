import React from 'react';
import classNames from 'classnames';

export default class Sidebar extends React.Component {
  render () {


    let positionClass = this.props.position ? this.props.position + '-panel' : '';

  	// let data = this.props.data;
    return (
      <div className={classNames('sidebar', positionClass)}>
        <div className="content-container compiled-css">
          {this.props.data}
        </div>
      </div>
    );
  }
}