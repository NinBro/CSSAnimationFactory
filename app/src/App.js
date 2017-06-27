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
import Sidebar from './components/Sidebar';
import DatePicker from './components/DatePicker';
import TimelineEditor from './components/TimelineEditor/TimelineEditor';
import TimelinePreview from './components/TimelinePreview';
import { Button } from 'antd';
import './App.scss';

export default class App extends React.Component {
constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onclickAddNewTimeline = this.onclickAddNewTimeline.bind(this);
    this.onClickTimelineTrack = this.onClickTimelineTrack.bind(this);
    this.state = {
      timelineCount: 0,
      timelines: ['yooooo', 'broooooo'],
      // rightSidebarActive: false,
      rightSidebarActive: true, // for testing
      rightSidebarData: 'sdaoaskdsaodasokdosadkosadokasdok',
      baseCSS: '',
      appData: ''
    }
  }


  // Starting point for data
  getAppData() {

    // og
    let data = {
      timelines : [
        {
          timelineName : 'circleOne',
          classNames : 'logo',
          descendants : [{
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
          }],
          type : 'normal',
          animationProperties : {
            animationDirection : 'normal',
            duration : '10s',
            iteration : 'infinite',
            timingFunction : 'linear'
          }
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
      previewContentCSS : 'background: #DB5956;',
      rawCSS : ".content * {  box-sizing: border-box;}html {  background: #DB5956;}.logo {  width: 230px;  height: 230px;  margin: 40px auto;  position: relative;}.rings {  border-radius: 50%;  border: 10px solid #fff;  position: absolute;  top: 0;  bottom: 0;  left: 0;  right: 0;  margin: auto;}.rings:before, .rings:after {  content: '';  position: absolute;  width: 25px;  height: 25px;  background: #fff;  border-radius: 50%;}.rings:before {  top: -18px;  left: 0;  right: 0;  margin: auto;}.rings:after {  bottom: -18px;  left: 0;  right: 0;  margin: auto;}.rings:first-of-type {  width: 230px;  height: 230px;}.rings:first-of-type:before {  box-shadow: 5px 0 0 #DB5956;}.rings:first-of-type:after {  box-shadow: -5px 0 0 #DB5956;}.rings:nth-of-type(2) {  width: 150px;  height: 150px;  transform: rotate(90deg);}.rings:nth-of-type(2):before {  box-shadow: -5px 0 0 #DB5956;}.rings:nth-of-type(2):after {  box-shadow: 5px 0 0 #DB5956;}.rings:nth-of-type(3) {  width: 70px;  height: 70px;  transform: rotate(45deg);}.rings:nth-of-type(3):before {  box-shadow: 5px 0 0 #DB5956;}.rings:nth-of-type(3):after {  box-shadow: -5px 0 0 #DB5956;}"
    };

    // var data = {
    //   timelines : [
    //     {
    //       timelineName : 'circleOne-child',
    //       id : 2,
    //       classNames : 'rings',
    //       type : 'normal',
    //       animationProperties : {
    //         animationDirection : 'reverse',
    //         duration : '5s',
    //         iteration : 'infinite',
    //         timingFunction : 'ease'
    //       },
    //       keyframes : [
    //         {
    //           position : 0,
    //           css : ' transform: rotate(0deg);'
    //         },
    //         {
    //           position : 100,
    //           css : ' transform: rotate(360deg);'
    //         }
    //       ]
    //     }
    //   ],
    //   previewContentCSS : 'background: #DB5956;',
    //   rawCSS : ".content * {  box-sizing: border-box;}html {  background: #DB5956;}.logo {  width: 230px;  height: 230px;  margin: 40px auto;  position: relative;}.rings {  border-radius: 50%;  border: 10px solid #fff;  position: absolute;  top: 0;  bottom: 0;  left: 0;  right: 0;  margin: auto;}.rings:before, .rings:after {  content: '';  position: absolute;  width: 25px;  height: 25px;  background: #fff;  border-radius: 50%;}.rings:before {  top: -18px;  left: 0;  right: 0;  margin: auto;}.rings:after {  bottom: -18px;  left: 0;  right: 0;  margin: auto;}.rings:first-of-type {  width: 230px;  height: 230px;}.rings:first-of-type:before {  box-shadow: 5px 0 0 #DB5956;}.rings:first-of-type:after {  box-shadow: -5px 0 0 #DB5956;}.rings:nth-of-type(2) {  width: 150px;  height: 150px;  transform: rotate(90deg);}.rings:nth-of-type(2):before {  box-shadow: -5px 0 0 #DB5956;}.rings:nth-of-type(2):after {  box-shadow: 5px 0 0 #DB5956;}.rings:nth-of-type(3) {  width: 70px;  height: 70px;  transform: rotate(45deg);}.rings:nth-of-type(3):before {  box-shadow: 5px 0 0 #DB5956;}.rings:nth-of-type(3):after {  box-shadow: -5px 0 0 #DB5956;}"
    // };

    return data;
  }

  static defaultProps = {
      stuffToDo: 'nothing'
  };

  componentWillMount() {


    let i = this.state.timelineCount;
    let formattedTimelines = [];
    _.each(this.getAppData().timelines, function(timeline) {
      console.log(timeline);
      timeline.id = i;
      formattedTimelines.push(timeline);
      i++;
    });

    console.log(formattedTimelines);


    this.setState({
      baseCSS: this.getRawCSS(),
      appData: this.getAppData(),
      timelines: formattedTimelines,
      timelineCount: i
      // baseCSS: 'asdasdas'
    })
  }

  getRawCSS() {
    return this.getAppData().rawCSS;
  }


  handleChange(value) {
    console.log(value);
    this.setState({
      baseCSS: value
      // baseCSS: 'asdasdas'
    })
  }

  onClickEditBaseCSS() {
    console.log('stuff done!!', this.state.rightSidebarData);
    // this.setState({rightSidebarActive: !this.state.rightSidebarActive});
    this.setState({rightSidebarData : this.state.baseCSS});
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

  onClickTimelineTrack(data) {
    console.log(data);
    this.setState({rightSidebarData : data.timelineName});
  }

  renderPreviewContent() {
    const timelines = this.state.timelines;
    console.log(timelines);
    const renderTimelines = timelines.map((timeline) =>
      <TimelinePreview {...timeline} />
    );

    return (
      <div className="preview">
        {renderTimelines}
      </div>
    );
  }

  render() {

    let _this = this;

    let stuffToDo = function () {
      // return _this.props.stuffToDo;
      console.log(_this.props.stuffToDo);
    }

    // let bro = this.getRawCSS();

    let SidebarClasses = 'active';

    return (
      <div id="animationFactory" className="app">
        <Helmet>
            <meta charSet="utf-8" />
            <title>CSS Animation Factory</title>
            <style type="text/css" id={SidebarClasses}>{this.state.baseCSS}</style>
        </Helmet>
        <div className="navigation">
          <Button onClick={this.onclickAddNewTimeline.bind(this)}>Add Timeline</Button>
          <Button onClick={this.onClickEditBaseCSS.bind(this)}>Edit Base CSS</Button>
        </div>
        {this.renderPreviewContent()}
        <Sidebar position="left" data={this.state.baseCSS} />
        <Sidebar position="right" onChange={this.handleChange} type="editor" data={this.state.rightSidebarData} active={this.state.rightSidebarActive} />
        <div className="timeline-editor-wrapper">
          <TimelineEditor onClickTimelineTrack={this.onClickTimelineTrack} timelines={this.state.timelines} />
        </div>

      </div>
    );
  }
}