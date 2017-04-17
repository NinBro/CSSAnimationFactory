import React from 'react';
import Sidebar from './components/Sidebar';
import DatePicker from './components/DatePicker';
import TimelineEditor from './components/TimelineEditor/TimelineEditor';
import { Button } from 'antd';
import './App.scss';

export default class App extends React.Component {

  getAppData() {

    // og
    let data = {
      timelines : [
        {
          id: 1,
          timelineName : 'circleOne',
          classNames : 'logo',
          descendants : ['circleOne-child', 'circleOne-child-two', 'circleOne-child-three'],
          type : 'normal',
          animationProperties : {
            animationDirection : 'normal',
            duration : '10s',
            iteration : 'infinite',
            timingFunction : 'linear'
          }
        },
        {
          timelineName : 'circleOne-child',
          id : 2,
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
          id : 2,
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
          id : 2,
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

  getRawCSS() {
    return this.getAppData().rawCSS;
  }

  render() {

    let _this = this;

    let logit = function () {
      console.log('click happen');
      _this.props.stuffToDo = "Stuff to dooooooo!!!!!"
    }

    let stuffToDo = function () {
      // return _this.props.stuffToDo;
      console.log(_this.props.stuffToDo);
    }

    // let bro = this.getRawCSS();

    return (
      <div className="app">
        <div className="navigation">
          <Button onClick={logit}>Add Timeline</Button>
        </div>
        <Sidebar data={this.getRawCSS()} />
        <div className="timeline-editor-wrapper">
          <TimelineEditor doStuff={stuffToDo} />
        </div>

      </div>
    );
  }
}