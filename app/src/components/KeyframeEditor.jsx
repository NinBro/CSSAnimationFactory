import React from 'react';
import classNames from 'classnames';
import CSSEditor from './CSSEditor';

export default class KeyframeEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {

    // renderKeyframes
    let renderKeyframes = '';
    if (this.props.keyframes && this.props.keyframes.length) {
      const keyframes = this.props.keyframes;
      console.log(keyframes);
      renderKeyframes = keyframes.map((keyframe) =>
        <div className="keyframe-editor-container" position={keyframe.position}>
          <span className="title">{keyframe.position}% Keyframe</span>
          {/*<span className="title delete">x</span>*/}
          <CSSEditor data={keyframe.css} />
        </div>
      );
    }
    console.log(this.props.keyframes);

    return (
      <div className={classNames('KeyframeEditor')}>
        <div className="">
          {renderKeyframes}
        </div>
      </div>
    );
  }
}