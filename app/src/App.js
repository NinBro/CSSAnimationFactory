//   ___  _   _ ________  ___ ___ _____ _____ _____ _   _
//  / _ \| \ | |_   _|  \/  |/ _ \_   _|_   _|  _  | \ | |
// / /_\ \  \| | | | | .  . / /_\ \| |   | | | | | |  \| |
// |  _  | . ` | | | | |\/| |  _  || |   | | | | | | . ` |
// | | | | |\  |_| |_| |  | | | | || |  _| |_\ \_/ / |\  |
// \_| |_|_| \_/\___/\_|  |_|_| |_/\_/  \___/ \___/\_| \_/
//
// ______ ___  _____ _____ _____________   __
// |  ___/ _ \/  __ \_   _|  _  | ___ \ \ / /
// | |_ / /_\ \ /  \/ | | | | | | |_/ /\ V /
// |  _||  _  | |     | | | | | |    /  \ /
// | |  | | | | \__/\ | | \ \_/ / |\ \  | |
// \_|  \_| |_/\____/ \_/  \___/\_| \_| \_/
//

// ANIMATION FACTORY
// -----------------------------------------------------------------------------

import React from 'react';
import _ from 'lodash';
import {Helmet} from "react-helmet";
import Sidebar from './components/Sidebar/Sidebar.jsx';
import classNames from 'classnames';
import DatePicker from './components/DatePicker';
import TimelineEditor from './components/TimelineEditor/TimelineEditor';
import Preview from './components/Preview/Preview.jsx';
import Button from './components/Button.jsx';
import Editor from './components/Editor/Editor.jsx';

// import { Button } from 'antd';
import './App.scss';

export default class App extends React.Component {
constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onclickAddNewTimeline = this.onclickAddNewTimeline.bind(this);
    this.onClickTimelineTrack = this.onClickTimelineTrack.bind(this);
    this.onClickPreview = this.onClickPreview.bind(this);


    this.appEvent = this.appEvent.bind(this);
    this.state = {
      timelineCount: 0,
      showEditor: true,
      // original state
      timelines: null,
      // Used for faster data modification
      timelinesFlattened: null,
      rightSidebarData: {
        active: false,
        type: 'editor',
        data: null
      },
      baseCSS: '',
      appData: ''
    }
  }

  componentWillMount() {

    // Set ID for each timeline for tracking
    let i = this.state.timelineCount;
    let formattedTimelines = [];
    _.each(this.getAppData().timelines, function(timeline) {
      timeline.id = i;
      i++;

      if (timeline.descendants.length) {
        _.each(timeline.descendants, function(descendant) {
          descendant.id = i;
          i++;
        });
      }
      formattedTimelines.push(timeline);

    });

    this.setState({
      baseCSS: this.getRawCSS(),
      appData: this.getAppData(),
      timelines: formattedTimelines,
      timelineCount: i
    });
  }

  // Starting point for data
  getAppData() {

    // og
    let data = {
      timelines : [
        {
          timelineName : 'circleOne',
          classNames : 'logo',
          descendants : [
            {
              timelineName : 'circleOne-child',
              classNames : 'rings',
              type : 'normal',
              animationProperties : {
                animationDirection : 'normal',
                duration : '5s',
                iteration : 'infinite',
                timingFunction : 'ease'
              },
              keyframes : [
                {
                  position : 0,
                  css : ' transform: rotate(0deg);'
                },
                {
                  position : 100,
                  css : ' transform: rotate(360deg);'
                }
              ]
            },
            {
              timelineName : 'circleOne-child-two',
              classNames : 'rings',
              type : 'normal',
              animationProperties : {
                animationDirection : 'reverse',
                duration : '4s',
                iteration : 'infinite',
                timingFunction : 'ease'
              },
              keyframes : [
                {
                  position : 0,
                  css : ' transform: rotate(0deg);'
                },
                {
                  position : 100,
                  css : ' transform: rotate(360deg);'
                }
              ]
            },
            {
              timelineName : 'circleOne-child-three',
              classNames : 'rings',
              type : 'normal',
              animationProperties : {
                animationDirection : 'normal',
                // duration : '3s',
                duration : '3s',
                iteration : 'infinite',
                timingFunction : 'ease'
              },
              keyframes : [
                {
                  position : 0,
                  css : ' transform: rotate(0deg);'
                },
                {
                  position : 100,
                  css : ' transform: rotate(360deg);'
                }
              ]
            }
          ],
          type : 'normal',
          animationProperties : {
            animationDirection : 'normal',
            duration : '10s',
            iteration : 'infinite',
            timingFunction : 'linear'
          }
        }
      ],
      previewContentCSS : 'background: #DB5956;',
      rawCSS : ".content * {  box-sizing: border-box;} .preview {  background: #DB5956;} .logo {  width: 230px;  height: 230px;  margin: 40px auto;  position: relative;}.rings {  border-radius: 50%;  border: 10px solid #fff;  position: absolute;  top: 0;  bottom: 0;  left: 0;  right: 0;  margin: auto;}.rings:before, .rings:after {  content: '';  position: absolute;  width: 25px;  height: 25px;  background: #fff;  border-radius: 50%;}.rings:before {  top: -18px;  left: 0;  right: 0;  margin: auto;}.rings:after {  bottom: -18px;  left: 0;  right: 0;  margin: auto;}.rings:first-of-type {  width: 230px;  height: 230px;}.rings:first-of-type:before {  box-shadow: 5px 0 0 #DB5956;}.rings:first-of-type:after {  box-shadow: -5px 0 0 #DB5956;}.rings:nth-of-type(2) {  width: 150px;  height: 150px;  transform: rotate(90deg);}.rings:nth-of-type(2):before {  box-shadow: -5px 0 0 #DB5956;}.rings:nth-of-type(2):after {  box-shadow: 5px 0 0 #DB5956;}.rings:nth-of-type(3) {  width: 70px;  height: 70px;  transform: rotate(45deg);}.rings:nth-of-type(3):before {  box-shadow: 5px 0 0 #DB5956;}.rings:nth-of-type(3):after {  box-shadow: -5px 0 0 #DB5956;}"
    };

    return data;
  }

  getRawCSS() {
    return this.getAppData().rawCSS;
  }


  handleChange(value) {
    // If updating a timeline
    if (value.timelineName) {
      this.updateTimeline(value);
    } else {
      this.setState({
        baseCSS: value
      });
    }
  }

  updateTimeline(timelineToUpdate, eventName) {
    if (timelineToUpdate.timelineName) {
      let timelines = this.state.timelines;
      let descendantId = null;
      let match = _.find(timelines, function(timeline) {
        if (timeline.descendants.length) {
          descendantId = _.find(timeline.descendants, function(descendant) {
            return descendant.id === timelineToUpdate.id;
          });
        }

        return (descendantId && descendantId.id) || (timeline.id === timelineToUpdate.id);
      });

      // Secondary match
      if (descendantId) {
        let descendantToUpdate = _.findIndex(this.state.timelines[0].descendants, function(descendant) { return descendant.id === descendantId.id; });
        timelines[0].descendants[descendantToUpdate] = timelineToUpdate;

        // var newSelected = _.extend({}, this.state.rightSidebarData);
        // newSelected.data = timelineToUpdate;
        // this.setState({
        //   timelines: timelines
        // });
      // Primary match
      } else if (match) {
        let timelineIdToUpdate = _.findIndex(this.state.timelines, function(timeline) { return timeline.id === match.id; });
        timelines[timelineIdToUpdate] = timelineToUpdate;

        // let dataToSave = {
        //   timelines: timelines
        // };


        // if (eventName && (eventName === 'onMouseEnter' || eventName === 'onMouseLeave')) {
        //   // do nothing extra for hover state
        // }

        // // When self updating.....
        // else if (this.state.rightSidebarData.active) {
        //   dataToSave.rightSidebarData = {
        //     active: true,
        //     data: {
        //       timeline: timelineToUpdate
        //     }
        //   }
        // }

        // this.setState(dataToSave);
      }

      if (descendantId || match) {
        let dataToSave = {
          timelines: timelines
        };


        if (eventName && (eventName === 'onMouseEnter' || eventName === 'onMouseLeave')) {
          // do nothing extra for hover state
        }

        // When self updating.....
        else if (this.state.rightSidebarData.active) {
          dataToSave.rightSidebarData = {
            active: true,
            data: {
              timeline: timelineToUpdate
            }
          }
        }

        this.setState(dataToSave);
      }
    }
  }

  appEvent(eventName, callback) {
    // console.log(eventName, callback);
    this.updateTimeline(callback, eventName);
  }

  onClickEditBaseCSS() {
    this.setState({rightSidebarData: {
      data : this.state.baseCSS
    }});
  }

  onclickAddNewTimeline() {
    console.log('stuff done!!');

    let i = this.state.timelineCount;
    i++;

    let currentTimelines = this.state.timelines;
    let newTimeline = {
      id: i,
      timelineName: 'New Timeline'
    };
    currentTimelines.push(newTimeline);

    this.setState({
      timelines: currentTimelines,
      timelineCount : i
    });


    console.log(currentTimelines);
    // this.setstate((prevState) => ({
    //   timelines: prevstate.timelines.push('sadasdsadsadsadads')
    // }));

    // this.setState((prevState) => ({
    //   timelines: prevState.timelines.push('sadsadsadasdsadsad')
    // }));

    // this.state.timelines.push('MORE') ;
  }

  // Hide sidebar when preview is clicked
  onClickPreview() {
    this.setState({
      rightSidebarData: {
        active: false
      }
    });
  }

  // Show sidebar when timeline clicked
  // @param timeline {}
  onClickTimelineTrack(timeline) {
    this.setState({
      rightSidebarData: {
        active: true,
        data: {
          timeline: timeline
        }
      }
    });
  }

  onClickShowEditor() {
    this.setState({
      showEditor: true
    });
  }

  onClickHideEditor() {
    this.setState({
      showEditor: false
    });
  }

  // Renders Preview Pane
  renderPreviewContent() {
    let full = '';
    if (!this.state.showEditor) {
      full = 'full';
    }
    const timelines = this.state.timelines;
    const renderTimelines = timelines.map((timeline) =>
      <Preview {...timeline} />
    );

    return (
      <div className={classNames('Preview preview', full)} onClick={this.onClickPreview} >
        {renderTimelines}
      </div>
    );
  }

  // @param timeslines {array}
  timelinesGet(timelines, callback) {
    const _this = this;
    let css = '';
    let results = [];

    _.each(timelines, function(timeline) {
      // css += _this.renderTimelineCSS(timeline, type);
      results.push(callback(timeline));

      // Render nested timeline CSS
      if (timeline.descendants && timeline.descendants.length) {
        _.each(timeline.descendants, function(descendant) {
          // css += _this.renderTimelineCSS(descendant, type);
          results.push(callback(descendant));
        });
      }
    });

    return results;
  }

  getTimelineName(value) {
    console.log(value.timelineName);
  };

  getTimelineDuration(value) {
    // console.log(value.animationProperties.duration);
    return parseInt(value.animationProperties.duration);
  };

  /*
   * Returns compiled CSS from {timelines} provided
   * @param {array} timelines
   * @param {string} type
   * @returns {string} CSS
   */
  renderAnimationCSS(timelines, type) {
    console.log('renderAnimationCSS', timelines, type);
    const _this = this;
    const lineBreak = '\n';
    const indent = '  ';
    let css = '';

    _.each(timelines, function(timeline) {
      css += _this.renderTimelineCSS(timeline, type);

      // Render nested timeline CSS
      if (timeline.descendants && timeline.descendants.length) {
        _.each(timeline.descendants, function(descendant) {
          css += lineBreak + lineBreak + _this.renderTimelineCSS(descendant, type);
        });
      }
    });

    // console.log('renderAnimationCSS', css);
    return css;
  }

  /*
   * Render timeline CSS
   * @param {object} timeline
   * @param {string} type
   * @returns {string} CSS
   */
  renderTimelineCSS(timeline, type) {
    const _this = this;
    const lineBreak = '\n';
    const indent = '  ';

    let css = '';
    if (timeline.animationProperties) {
      css += _this.getAnimationProperties(timeline, type);
      if (type && type === 'preview') {
        // do nothing
      } else {
        css += lineBreak + lineBreak + _this.renderAnimatedKeyframesCSS(timeline, type);
      }
    }

    if (timeline.keyframes && timeline.keyframes.length) {
      css += lineBreak + lineBreak + _this.getCSSKeyframes(timeline, type);
      if (type && type === 'preview') {
        // do nothing
      } else {
        css += lineBreak + _this.getCSSKeyframeCursor(timeline);
      }
    }

    // console.log('renderTimelineCSS', css);
    return css;
  }

  /*
   * Render
   * @param {object} timeline
   * @returns {string}
   */
  renderAnimatedKeyframesCSS(timeline) {
    // const keyframes = keyframes;
    let css = '';
    let animationProperties = timeline.animationProperties;
    const lineBreak = '\n';
    const indent = '  ';

    if (animationProperties) {
      const selectorOpen = `.TimelineTrack[name="${timeline.timelineName}"] .animation-key {`;
      const animation = `animation: ${timeline.timelineName}-cursor ${animationProperties.duration} infinite linear;`;
      const selectorClose = `}`;



//       css +=  `
// .TimelineTrack[name="${timeline.timelineName}"] .animation-key {
//   animation: ${timeline.timelineName}-cursor ${animationProperties.duration} infinite linear;
// }
// `;

      css = selectorOpen + lineBreak + indent + animation + lineBreak + selectorClose;
    }

    // console.log('renderAnimatedKeyframesCSS', css);
    return css;
  }

  getCSSKeyframeCursor(timeline) {
    // const keyframes = keyframes;
    let css = '';

      css = `
@keyframes ${timeline.timelineName}-cursor {
  0% {
    transform: translate(0%, 0);
  }

  100% {
    transform: translate(100%, 0);
  }
}
`;

    return css;
  }

  /*
   * Render
   * @param {object} timeline
   * @param {string} type
   * @returns {string} CSS
   */
  getAnimationProperties(timeline, type) {
    console.log('getAnimationProperties', timeline, type);
    const { animationProperties, timelineProperties } = timeline;


      const lineBreak = '\n';
      const indent = '  ';

    // const keyframes = keyframes;
    let css = '';
    // let animationProperties = timeline.animationProperties;
    let preview = '';
    if (type && type === 'preview') {

    } else {
      preview = '.preview ';
    }

    let animationPlayState = '';
    if (_.isObject(timelineProperties) && timelineProperties.playState) {
      animationPlayState = lineBreak + indent + `animation-play-state: ${timelineProperties.playState};`;
    }

    let visibility = '';
    if (_.isObject(timelineProperties) && !_.isUndefined(timelineProperties.visible)) {
      let visibilityState;
      if (timelineProperties.visible) {
        visibilityState = 'visible';
      } else {
        visibilityState = 'hidden';
      }
      visibility = lineBreak + indent + `visibility: ${visibilityState};`;
    }

    if (_.isObject(animationProperties)) {
      let selectorOpen = `${preview}[name="${timeline.timelineName}"] {`;
      let selectorAnimation = `animation: ${timeline.timelineName} ${animationProperties.duration} ${animationProperties.iteration} ${animationProperties.timingFunction} ${animationProperties.animationDirection};`;
      let selectorClose = `}`;

//       css +=
// `
// ${preview}[name="${timeline.timelineName}"] {
//   animation: ${timeline.timelineName} ${animationProperties.duration} ${animationProperties.iteration} ${animationProperties.timingFunction} ${animationProperties.animationDirection};
//   ${animationPlayState}
// }
// `;

      css = selectorOpen + lineBreak + indent + selectorAnimation + animationPlayState + visibility + lineBreak + selectorClose;

    }

    return css;
  }


  /*
   * @param {object} timeline
   */
  getCSSKeyframes(timeline) {
    let keyframes = timeline.keyframes;
    const lineBreak = '\n';
    const indent = '  ';

    let css = this.generateCSSKeyframes(keyframes, 2);
    if (css) {
      const selectorOpen = `@keyframes ${timeline.timelineName} {`;
      const selectorClose = `}`;

      css = selectorOpen + lineBreak + css + lineBreak + selectorClose;
    }

    // console.log('getCSSKeyframes', css);
    return css;
  }
  /*
   * @param {array} keyframes
   * @param {number} indentDepth
   * @returns {string}
   */
  generateCSSKeyframes(keyframes, indentDepth) {
    const lineBreak = '\n';
    const indentChar = '  ';
    let css = '';

    let indentAmt = indentDepth || 1;
    let indentPrefix = indentChar.repeat((indentAmt - 1));
    let indent = indentChar.repeat(indentAmt);

    if (keyframes && keyframes.length) {
      _.each(keyframes, (keyframe, i) => {

        // keyframe.position && keyframe.position.length
        const selectorOpen = `${indentPrefix}${keyframe.position}% {`;
        const selectorClose = `${indentPrefix}}`;

        let conditionalBreak = '';
        if (i !== 0) {
          conditionalBreak = lineBreak + lineBreak;
        }

        if (keyframe.css && keyframe.css.length) {
          css += conditionalBreak + selectorOpen + lineBreak + indent + _.trim(keyframe.css) + lineBreak + selectorClose;
        }
      });
    }

    // console.log('generateCSSKeyframes', css);
    return css;
  }

  /*
   * @param {array} timelines
   * @param {object} masterTimeline
   * @returns {string}
   */
  compileAnimationCSS(timelines, masterTimeline) {
    console.log('compileAnimationCSS', timelines, masterTimeline);
    return this.renderAnimationCSS(timelines) + this.renderAnimatedKeyframesCSS(masterTimeline) + this.getCSSKeyframeCursor(masterTimeline);
  }

  /*
   * @param {array} timelines
   * @returns {object}
   */
  getMasterTimeline(timelines) {

    let durations = this.timelinesGet(timelines, this.getTimelineDuration);
    let longestDuration = Math.max.apply(Math, durations);

    return {
        timelineName : 'Master',
        classNames : 'master',
        type : 'normal',
        animationProperties : {
          animationDirection : 'normal',
          duration : longestDuration + 's',
          iteration : 'infinite',
          timingFunction : 'linear'
        },
        keyframes : [
          {
            position : 0,
            css : ' transform: rotate(0deg);'
          },
          {
            position : 100,
            css : ' transform: rotate(360deg);'
          }
        ]
      };
  }

  /*
   * {array} timelines
   */
  renderEditor(timelines) {
    let leftSidebarData = '';
    // If timeline active show its css
    if (this.state.rightSidebarData.data && this.state.rightSidebarData.data.timeline) {
      leftSidebarData = this.renderAnimationCSS([this.state.rightSidebarData.data.timeline], 'preview');
    // Otherwise show global css
    } else {
      leftSidebarData = this.renderAnimationCSS(timelines, 'preview');
    }

    let editorData = {
      leftSidebarData: leftSidebarData,
      rightSidebarData: {
        onChange: this.handleChange,
        type: this.state.rightSidebarData.type,
        data: this.state.rightSidebarData.data,
        active: this.state.rightSidebarData.active
      },
      timelineEditor: {
        appEvent: this.appEvent,
        onClickTimelineTrack: this.onClickTimelineTrack,
        timelines: timelines,
        masterTimeline: this.getMasterTimeline(timelines)
      }
    };

    let editorNode;
    if (this.state.showEditor) {
      editorNode = <Editor editorData={editorData}/>;;
    } else {
      editorNode = null;
    }

    return editorNode;
  }

  /*
   * @param {boolean} showEditor
   * @returns {node}
   */
  renderEditorBtn(showEditor) {
    let element;
    if (showEditor) {
      element = (
        <Button onClick={this.onClickHideEditor.bind(this)}>
          Hide Editor
        </Button>
      );
    } else {
      element = (
        <Button onClick={this.onClickShowEditor.bind(this)}>
          Show Editor
        </Button>
      );
    }

    return element;
  }

  render() {
    let _this = this;
    let baseCSS = 'baseCSS';
    let animationCSS = 'animationCSS';
    const timelines = this.state.timelines;

    return (
      <div id="animationFactory" className="app">
        <Helmet>
          <meta charSet="utf-8" />
          <title>CSS Animation Factory</title>
          <style type="text/css" id={baseCSS}>{this.state.baseCSS}</style>
          <style type="text/css" id={animationCSS}>{this.compileAnimationCSS(timelines, this.getMasterTimeline(timelines))}</style>
        </Helmet>
        <div className="navigation">
          {this.renderEditorBtn(this.state.showEditor)}
          <Button onClick={this.onclickAddNewTimeline.bind(this)}>Add Timeline</Button>
          <Button onClick={this.onClickEditBaseCSS.bind(this)}>Edit Base CSS</Button>
        </div>
        {this.renderPreviewContent()}
        {this.renderEditor(timelines)}
      </div>
    );
  }
}