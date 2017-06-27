import React from 'react';
import classNames from 'classnames';

export default class TimelinePreview extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   data: this.props.data || ''
    // };
    // this.handleChange = this.handleChange.bind(this);
  }


  renderDescendants() {
    if (this.props.descendants && this.props.descendants.length) {
      const descendants = this.props.descendants;
      console.log(descendants);
      const renderDescendant = descendants.map((descendant) =>
        <div className={descendant.classNames} />
        // console.log('stuff', timeline, timeline.timelineName)
      );

      return (
        <div className="preview">
          {renderDescendant}
        </div>
      );

      // return renderDescendants;
    }
  }

  render () {
    // renderDescendants
    let renderDescendants = '';
    if (this.props.descendants && this.props.descendants.length) {
      const descendants = this.props.descendants;
      console.log(descendants);
      renderDescendants = descendants.map((descendant) =>
        <div className={descendant.classNames} />
        // console.log('stuff', timeline, timeline.timelineName)
      );

      // return (
      //   <div className="preview">
      //     {renderDescendant}
      //   </div>
      // );

      // return renderDescendants;
    }


    return (
      <div className={classNames('', this.props.classNames)}>
        {renderDescendants}
      </div>
    );
  }
}