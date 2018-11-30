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
import { Select } from 'antd';
import Editor from './components/Editor/Editor.jsx';

// Samples
import circleWheels from './animation-samples/circle-wheels';
import monkey404 from './animation-samples/monkey-404';


import './App.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.updateTimelineProperties = this.updateTimelineProperties.bind(this);
    this.onclickAddNewTimeline = this.onclickAddNewTimeline.bind(this);
    this.onClickTimelineTrack = this.onClickTimelineTrack.bind(this);
    this.handleTimelineChange = this.handleTimelineChange.bind(this);
    this.updatePreviewKeyPath = this.updatePreviewKeyPath.bind(this);
    this.handleSampleChange = this.handleSampleChange.bind(this);


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

  loadSample(sample) {
    let data;
    switch (sample) {
      case 'circleWheels':
        data = circleWheels;
        break;
      case 'monkey404':
        data = monkey404;
        break;
    }

    return _.cloneDeep(data);
  }

  // Starting point for data
  getAppData() {
    return this.loadSample('circleWheels');
  }

  getRawCSS() {
    return this.getAppData().rawCSS;
  }
  /*
   * @param {string} - sample
   */
  handleSampleChange(sample) {
    const { timelines, previewContentCSS, rawCSS } = this.loadSample(sample);
    this.setState({
      timelines,
      previewContentCSS,
      rawCSS
    });
  }

  /*
   * Updates the timelineProperties inside timeline (timeline.timelineProperties)
   * {object} timelineProps
   * {object} timeline
   */
  updateTimelineProperties(timelineProps, timeline) {
    // console.log('updateTimelineProperties', timelineProps);
    // let currentData = this.getProps();
    let newData = {};
    if (_.isObject(timeline.timelineProperties)) {
      let mergedProps = _.merge({}, timeline.timelineProperties, timelineProps);
      newData.timelineProperties = mergedProps;
    } else {
      newData.timelineProperties = timelineProps;
    }

    const mergedData = _.assign({}, timeline, newData);

    // console.log('updateTimelineProperties', mergedData, timeline);
    // this.handleChange(mergedData);
   this.handleTimelineChange(mergedData);
  }

  /*
   * Updates....
   * @param {}
   */
  handleChange(value) {
    // Updat single timeline
    if (value.timelineName) {
      this.updateTimeline(value);
    } else {
      this.setState({
        baseCSS: value
      });
    }
  }

  /*
   * @param {object} timelineToUpdate
   * @param {string} eventName
   */
  updateTimeline(timelineToUpdate, eventName) {
    console.log('updateTimeline', timelineToUpdate, eventName);
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

 /*
  * Hide sidebar when preview is clicked
  */
  onClickPreview() {
    console.log('onClickPreview');
    this.setState({
      rightSidebarData: {
        active: false
      },
      activeTimelineKeyPath: []
    });
  }

  /*
   * @param {object} timeline
   */
  onClickTimelineTrack(timeline) {
    this.handleTimelineChange(timeline);
  }

  /*
   * @param {object} timeline
   */
  handleTimelineChange(timeline) {
    console.log('handleTimelineChange', timeline);
    const { timelines } = this.state;
    const { keyPath } = timeline;
    const newTimelines = _.cloneDeep(timelines);

    if (timeline.keyPath) {
      let timelineToUpdate;
      if (timeline.keyPath.length > 1) {
        newTimelines[timeline.keyPath[0]].descendants[timeline.keyPath[1]] = timeline;
      } else {
        newTimelines[timeline.keyPath[0]] = timeline;
      }
    }

    this.setState({
      rightSidebarData: {
        active: true,
        data: {
          timeline: timeline
        }
      },
      timelines: newTimelines,
      activeTimelineKeyPath: keyPath
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

  /*
   * @param {array} activeKeyPath
   * @returns {boolean}
   */
  isTimelineActive(activeKeyPath, timeline) {
    let isActive;
    if (_.isArray(activeKeyPath) && timeline && _.isArray(timeline.keyPath)) {
      isActive = activeKeyPath.join('') === timeline.keyPath.join('');
    } else {
      isActive = false;
    }

    // console.log('isActive', isActive, activeKeyPath, timeline);
    return isActive;
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
    // console.log('getAnimationProperties', timeline, type);
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
   * @returns {node}
   */
  renderEditor(timelines) {
    console.log('renderEditor', timelines);
    const { activeTimelineKeyPath } = this.state;
    let editorNode;
    if (this.state.showEditor) {
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
          updateTimelineProperties: this.updateTimelineProperties,
          type: this.state.rightSidebarData.type,
          data: this.state.rightSidebarData.data,
          active: this.state.rightSidebarData.active
        },
        timelineEditor: {
          activeTimelineKeyPath,
          isTimelineActive: this.isTimelineActive,
          updateTimelineProperties: this.updateTimelineProperties,
          updatePreviewKeyPath: this.updatePreviewKeyPath,
          appEvent: this.appEvent,
          onClickTimelineTrack: this.onClickTimelineTrack,
          timelines,
          masterTimeline: this.getMasterTimeline(timelines)
        }
      };

      // console.log('renderEditor', editorData);


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

  /*
   * @param {array} activeTimelineKeyPath
   * @param {array} activePreviewKeyPath
   * @returns {array}
   */
  getPreviewKeyPath(activeTimelineKeyPath, activePreviewKeyPath) {
    let keyPath;
    if (!_.isEmpty(activePreviewKeyPath)) {
      keyPath = activePreviewKeyPath;
    } else {
      keyPath = activeTimelineKeyPath;
    }

    console.log('getPreviewKeyPath', keyPath);
    return keyPath;
  }

  /*
   * @param {array} keyPath
   */
  updatePreviewKeyPath(keyPath) {
    // console.log('updatePreviewKeyPath', keyPath);
    this.setState({
      activePreviewKeyPath: keyPath
    });
  }

  render() {
    let _this = this;
    let baseCSS = 'baseCSS';
    let animationCSS = 'animationCSS';
    const { activeTimelineKeyPath, activePreviewKeyPath, timelines, showEditor } = this.state;

    console.log('app - render', this.state);
    return (
      <div id="animationFactory" className="app">
        <Helmet>
          <meta charSet="utf-8" />
          <title>CSS Animation Factory</title>
          <style type="text/css" id={baseCSS}>{this.state.baseCSS}</style>
          <style type="text/css" id={animationCSS}>{this.compileAnimationCSS(timelines, this.getMasterTimeline(timelines))}</style>
        </Helmet>
        <div className="navigation">
          {this.renderEditorBtn(showEditor)}
          <Button onClick={this.onclickAddNewTimeline.bind(this)}>Add Timeline</Button>
          <Button onClick={this.onClickEditBaseCSS.bind(this)}>Edit Base CSS</Button>
          <Select defaultValue="circleWheels" style={{ width: 120 }} onChange={this.handleSampleChange}>
            <Option value="circleWheels">circleWheels</Option>
            <Option value="monkey404">monkey404</Option>
          </Select>
        </div>
        <Preview
          activeTimelineKeyPath={this.getPreviewKeyPath(activeTimelineKeyPath, activePreviewKeyPath)}
          isTimelineActive={this.isTimelineActive}
          onClickPreview={this.onClickPreview}
          handleTimelineChange={this.handleTimelineChange}
          updatePreviewKeyPath={this.updatePreviewKeyPath}
          showEditor={showEditor}
          timelines={timelines}
        />
        {this.renderEditor(timelines)}
      </div>
    );
  }
}