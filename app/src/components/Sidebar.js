import React from 'react';

export default class Sidebar extends React.Component {
  render () {

  	// let data = this.props.data;
    return (
      <div className="sidebar left-panel">
        <div className="content-container compiled-css">
          {this.props.data}
        </div>
      </div>
    );
  }
}