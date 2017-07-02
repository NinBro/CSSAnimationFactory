import React from 'react';
import classNames from 'classnames';

export default class TimelinePreview extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    // renderDescendants
    let renderDescendants = '';
    if (this.props.descendants && this.props.descendants.length) {
      const descendants = this.props.descendants;
      // console.log(descendants);
      renderDescendants = descendants.map((descendant) =>
        <div name={descendant.timelineName} className={descendant.classNames} />
      );
    }

    return (
      <div name={this.props.timelineName} className={classNames('', this.props.classNames)}>
        {renderDescendants}
      </div>
    );
  }
}