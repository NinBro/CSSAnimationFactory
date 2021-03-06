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
import classNames from 'classnames';
import DatePicker from './components/DatePicker';
import Header from './components/Header/Header.jsx';
import TimelineEditor from './components/Editor/TimelineEditor/TimelineEditor';
import Preview from './components/Preview/Preview.jsx';
import Button from './components/Button.jsx';
import NewElement from './components/Modal/NewElement.jsx';
import { Select } from 'antd';
import Editor from './components/Editor/Editor.jsx';
import CSSUtil from './Util/CSSUtil.js';

// Samples
import circleWheels from './animation-samples/circle-wheels';
import monkey404 from './animation-samples/monkey-404';
import empty from './animation-samples/empty';


import './App.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.updateTimelineProperties = this.updateTimelineProperties.bind(this);
    this.onclickAddNewTimeline = this.onclickAddNewTimeline.bind(this);
    this.onClickTimelineTrack = this.onClickTimelineTrack.bind(this);
    this.handleTimelineChange = this.handleTimelineChange.bind(this);
    this.handleElementChange = this.handleElementChange.bind(this);
    this.handleChange_ = this.handleChange_.bind(this);



    this.updatePreviewKeyPath = this.updatePreviewKeyPath.bind(this);
    this.handleSampleChange = this.handleSampleChange.bind(this);
    this.renderAnimationCSS = this.renderAnimationCSS.bind(this);
    this.onClickPreview = this.onClickPreview.bind(this);
    this.onClickElement = this.onClickElement.bind(this);


    this.onClickHideEditor = this.onClickHideEditor.bind(this);
    this.onClickShowEditor = this.onClickShowEditor.bind(this);








    this.appEvent = this.appEvent.bind(this);
    this.getMasterTimeline = this.getMasterTimeline.bind(this);
    this.getElementProperties = this.getElementProperties.bind(this);
    this.getAnimationProperties_ = this.getAnimationProperties_.bind(this);
    this.getProperties = this.getProperties.bind(this);


    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);









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
    const sample = 'monkey404';
    // const sample = 'empty';
    const appData = this.loadSample(sample);
    const { animations, elements, rawCSS } = appData;

    // Set ID for each timeline for tracking
    let i = this.state.timelineCount;
    let formattedTimelines = [];
    _.each(appData.timelines, function(timeline) {
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
      sample,
      baseCSS: rawCSS,
      appData,
      timelines: formattedTimelines,
      timelineCount: i,
      animations,
      elements
    });
  }

  /*
   * Load sample animation preset
   * @param {string} sample
   * @returns {object}
   */
  loadSample(sample) {
    let data;
    switch (sample) {
      case 'circleWheels':
        data = circleWheels;
        break;
      case 'monkey404':
        data = monkey404;
        break;
      default:
        data = empty;
        break;
    }

    return _.cloneDeep(data);
  }

  /*
   * Change animation sample preset
   * @param {string} - sample
   */
  handleSampleChange(sample) {
    const { animations, elements, timelines, previewContentCSS, rawCSS } = this.loadSample(sample);
    this.setState({
      sample,
      baseCSS: rawCSS,
      animations,
      elements,
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
   * @param {object} timeline
   */
  handleTimelineChange(timeline) {
    // console.log('handleTimelineChange', timeline);
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


  /*
   * To update/add/remove item properties
   * @param {array} keyPath - element location to change
   * @param {object} element - new props
   */
  handleChange_(keyPath, itemType, item, cb) {
    const { animations, elements } = this.state;

    console.log('handleChange_', keyPath, itemType, item, cb);

    let newItems;
    let target;
    switch (itemType) {
      case 'element':
        newItems = _.cloneDeep(elements);
        target = this.getElementProperties(keyPath, newItems);
        break;
      case 'animation':
        newItems = _.cloneDeep(animations);
        target = this.getAnimationProperties_(keyPath, newItems);
        break;
      default:
        return;
    };


    // remove
    if (_.isEmpty(item)) {
      _.pull(newItems, newItems[keyPath]);
    // update
    } else if (!_.isEmpty(target)) {
      _.assign(target, item);
    // add
    } else if (_.isEmpty(target)) {
      newItems.push(item);
    }

    let toSaveObj = {};
    switch (itemType) {
      case 'element':
        toSaveObj.elements = newItems;
        break;
      case 'animation':
        toSaveObj.animations = newItems;
        break;
      default:
        return;
    };

    this.setState(toSaveObj);

    if (_.isFunction(cb)) {
      cb();
    }
  }

  /*
   * To update/add/remove element properties
   * @param {array} keyPath - element location to change
   * @param {object} element - new props
   */
  handleElementChange(keyPath, element, cb) {
    this.handleChange_(keyPath, 'element', element, cb);
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
      activeTimelineKeyPath: [],
      activeElementKeyPath: []
    });
  }

 /*
  * Makes current element active
  * @param {array} keyPath
  */
  onClickElement(keyPath) {
    console.log('onClickElement', keyPath);
    this.setState({
      rightSidebarData: {
        active: true
      },
      activeTimelineKeyPath: [],
      activeElementKeyPath: keyPath
    });
  }

  /*
   * @param {object} timeline
   */
  onClickTimelineTrack(timeline) {
    this.handleTimelineChange(timeline);
  }

  /*
   * @returns {array}
   */
  getNewAnimationPath(animations) {
    const newPath = animations.length;
    return [newPath];
  }

  /*
   * @returns {array}
   */
  getNewElementPath(elements) {
    const newPath = elements.length;
    return [newPath];
  }

  showModal() {
    const { animations, elements } = this.state;
    const newAnimationPath = this.getNewAnimationPath(animations);
    const newElementPath = this.getNewElementPath(elements);

    const modalProps = {
      keyPath: newElementPath,

      visible: true,
      handleElementChange: this.handleElementChange,
      newElementProps: {
         linkedAnimationKeyPath: newAnimationPath,
        name: 'New Element',
        css: 'width: 100px; height: 100px; background: blue;'
      }
    };

    const newAnimationProps = {
      name: 'NewAnimation',
      animationProperties : {
        animationDirection : 'normal',
        duration : '5s',
        iteration : 'infinite',
        timingFunction : 'ease'
      },
      keyframes: [
        {
          position: 0,
          css: 'opacity: 0.3; left: 160px; transform:skewX(20deg);'
        },
        {
          position: 65,
          css: 'opacity: 1; left: 114px; transform:skewX(0deg);'
        },
        {
          position: 100,
          css: 'opacity: 0.3; left: 160px; transform:skewX(20deg);'
        }
      ]
    };

    this.handleChange_(
      newAnimationPath,
      'animation',
      newAnimationProps,
      () => {
        this.handleElementChange(newElementPath, modalProps.newElementProps,
          () => {
            this.setState({
              modalProps
            });
          }
        );
      }
    );



    // const newElementProps = .assign(_.cloneDeep(elements), element);
    // this.setState({
    //   showModal: true,
    //   elementKeyPath: newPath
    // });
  }

  hideModal() {
    this.setState({
      modalProps: {
        visible: false
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

  /*
   * @param {array} keyPath
   * @param {array} elements
   * @retuns {object}
   */
  getElementProperties(keyPath, elements) {
    // console.log('getElementProperties', keyPath, elements);
    const target = keyPath && elements[keyPath[0]];
    let results;
    if (target) {
      // Make sure stop only if we need to. If there is more depth then go deeper
      if (target.elements && keyPath.length > 1) {
        const newKeyPath = keyPath.slice(1);
        results = this.getElementProperties(newKeyPath, target.elements);
      } else {
        results = target;
      }
    } else {
      results = {};
    }

    return results;
  }

  /*
   * @param {array} keyPath
   * @param {array} animations
   * @retuns {object}
   */
  getAnimationProperties_(keyPath, animations) {
    // // console.log('getElementProperties', keyPath, animations);
    // const target = keyPath && animations[keyPath[0]];
    // let results;
    // if (target) {
    //   if (target.animations) {
    //     const newKeyPath = keyPath.slice(1);
    //     results = this.getElementProperties(newKeyPath, target.animations);
    //   } else {
    //     results = target;
    //   }
    // } else {
    //   results = {};
    // }

    // return results;

    return this.getProperties(keyPath, animations, 'animations');
  }

  /*
   * Get properties for a particular element or animation
   * @param {array} keyPath - key path where properties are located
   * @param {array} items
   * @param {string} itemsKey - recursive key e.g. 'elements' or 'animations'
   * @retuns {object}
   */
  getProperties(keyPath, items, itemsKey) {
    // console.log('getProperties', keyPath, animations);
    const target = keyPath && items && items[keyPath[0]];
    let results;
    if (target) {
      if (target[itemsKey]) {
        const newKeyPath = keyPath.slice(1);
        results = this.getProperties(newKeyPath, target[itemsKey]);
      } else {
        results = target;
      }
    } else {
      results = {};
    }

    return results;
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
    // console.log('renderAnimationCSS', timelines, type);
    const _this = this;
    const lineBreak = '\n';
    const indent = '  ';
    let css = '';

    _.each(timelines, function(timeline) {
      css += _this.renderTimelineCSS(timeline, type);

      // Render nested timeline CSS
      if (timeline.animations && timeline.animations.length) {
        _.each(timeline.animations, function(descendant) {
          css += lineBreak + lineBreak + _this.renderTimelineCSS(descendant, type);
        });
      }
    });

    // console.log('renderAnimationCSS', css, timelines, type);
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
    const { name } = timeline;
    // const keyframes = keyframes;
    let css = '';
    let animationProperties = timeline.animationProperties;
    const lineBreak = '\n';
    const indent = '  ';

    if (animationProperties) {
      const selectorOpen = `.TimelineTrack[name="${name}"] .animation-key {`;
      const animation = `animation: ${name}-cursor ${animationProperties.duration} infinite linear;`;
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
@keyframes ${timeline.name}-cursor {
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
    const { animationProperties, timelineProperties, name } = timeline;


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
      let selectorOpen = `${preview}[data-animation-name="${name}"] {`;
      let selectorAnimation = `animation: ${name} ${animationProperties.duration} ${animationProperties.iteration} ${animationProperties.timingFunction} ${animationProperties.animationDirection};`;
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
   * @returns {string}
   */
  getCSSKeyframes(timeline) {
    const { keyframes, name } = timeline;
    const lineBreak = '\n';
    const indent = '  ';

    let css = this.generateCSSKeyframes(keyframes, 2);
    if (css) {
      const selectorOpen = `@keyframes ${name} {`;
      const selectorClose = `}`;

      css = selectorOpen + lineBreak + css + lineBreak + selectorClose;
    }

    // console.log('getCSSKeyframes', css, timeline);
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
   * CSS Animation Stylesheet
   * @param {array} timelines
   * @param {object} masterTimeline
   * @returns {string}
   */
  compileAnimationCSS(timelines, masterTimeline) {
    // console.log('compileAnimationCSS', timelines, masterTimeline);
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

    // console.log('getPreviewKeyPath', keyPath);
    return keyPath;
  }

  /*
   * Updates Preview Keypath (temporary hover)
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
    const {
      sample,
      animations,
      elements,
      activeElementKeyPath,
      activeTimelineKeyPath,
      activePreviewKeyPath,
      modalProps,
      timelines,
      showEditor,
      rightSidebarData
    } = this.state;

    console.log('app - render', this.state);

    return (
      <div id="animationFactory" className="app">
        <Helmet>
          <meta charSet="utf-8" />
          <title>CSS Animation Factory</title>
          <style type="text/css" id={baseCSS}>{this.state.baseCSS}</style>
          <style type="text/css" id={animationCSS}>{this.compileAnimationCSS(animations, this.getMasterTimeline(timelines))}</style>
          <style type="text/css" id="element-css">{CSSUtil.elementCSS(elements)}</style>
        </Helmet>
        <Header
          elements={elements}
          handleElementChange={this.handleElementChange}
          handleSampleChange={this.handleSampleChange}
          onclickAddNewTimeline={this.onclickAddNewTimeline}
          onClickEditBaseCSS={this.onClickEditBaseCSS}
          onClickHideEditor={this.onClickHideEditor}
          onClickShowEditor={this.onClickShowEditor}
          sample={sample}
          showEditor={showEditor}
          showModal={this.showModal}
        />
        <Preview
          elements={elements}
          animations={animations}
          activeKeyPath={this.getPreviewKeyPath(activeElementKeyPath, activePreviewKeyPath)}
          activeTimelineKeyPath={this.getPreviewKeyPath(activeElementKeyPath, activePreviewKeyPath)}
          getProperties={ this.getProperties }
          isTimelineActive={this.isTimelineActive}
          onClickPreview={this.onClickPreview}
          onClickElement={this.onClickElement}
          handleTimelineChange={this.handleTimelineChange}
          updatePreviewKeyPath={this.updatePreviewKeyPath}
          showEditor={showEditor}
          timelines={timelines}
        />
        <Editor
          { ...this.state}
          timelines={timelines}
          activeElementKeyPath={activeElementKeyPath}
          activeTimelineKeyPath={activeTimelineKeyPath}
          isTimelineActive={this.isTimelineActive}
          animations={animations}
          elements={elements}
          showEditor={showEditor}
          rightSidebarData={rightSidebarData}
          renderAnimationCSS={this.renderAnimationCSS}
          handleChange_={this.handleChange_}
          handleElementChange={this.handleElementChange}
          handleChange={this.handleChange}
          updateTimelineProperties={this.updateTimelineProperties}
          updatePreviewKeyPath={this.updatePreviewKeyPath}
          appEvent={this.appEvent}
          onClickTimelineTrack={this.onClickTimelineTrack}
          onClickElement={this.onClickElement}
          getMasterTimeline={this.getMasterTimeline}
          getAnimationProperties={this.getAnimationProperties_}
          getElementProperties={this.getElementProperties}

        />
        <NewElement
          animations={animations}
          getAnimationProperties={this.getAnimationProperties_}
          getElementProperties={this.getElementProperties}
          getProperties={this.getProperties}
          elements={elements}
          handleChange_={this.handleChange_}
          hideModal={this.hideModal}
          updateTimelineProperties={this.updateTimelineProperties}
          {...modalProps} />
      </div>
    );
  }
}