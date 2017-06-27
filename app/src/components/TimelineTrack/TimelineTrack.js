import React from 'react';

export default class TimelineTrack extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   data: this.props.data || ''
    // };
    this.onClick = this.onClick.bind(this);
  }

  Notch(props) {
    return <div is class="notch" position={props.position}></div>
  }

  getNotches() {
    let notchCnt = 101; // 0-100 on %
    let notches = [];
    let i;
    for (i = 0; i < notchCnt; i++) {
      notches.push(<this.Notch position={i} />);
    }

    return notches;
  }

  // Show config menu....
  onClick() {
    // console.log('cliiiick', this.props);
    this.props.onClick(this.props);
  }


  render () {
    return (
      <div className="timeline-track" name={this.props.timelineName} onClick={this.onClick}>
        <div className="timeline-meta">
          <input type="text" className="name" value={this.props.timelineName} />
        </div>
        <div className="timeline">
          <div className="notches">
            {this.getNotches()}
          </div>
          <div className="animation-key"></div>
        </div>
      </div>
    );
  }
}