import React from 'react';
import _ from 'lodash';
import Controller from './Controller.jsx';
import TimelineTrack from './TimelineTrack.jsx';

export default class TimelineEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(data, keyPath) {
    this.props.onClickTimelineTrack(data);
  }

  /*
   * Flattens timelines to single array depth
   * @param {array} timelines
   * @returns {array}
   */
  getTimelinesFlattened(timelines) {
    let newTimelines = [];

    _.each(timelines, (timeline, i) => {
      const newTimeline = {
        ...timeline,
        keyPath: [i]
      };

      // timeline.keyPath = [i];
      newTimelines.push(newTimeline);

      // Flatten....
      if (timeline.descendants && timeline.descendants.length) {
        _.each(timeline.descendants, (descendant, j) => {
          const newTimeline = {
            ...descendant,
            type: 'secondary',
            keyPath: [i, j]
          };
          // descendant.type = 'secondary';
          // descendant.keyPath = [i, j];
          newTimelines.push(newTimeline);
        });
      }
    });

    return newTimelines;
  }

  /*
   * Flatten elements
   * @param {array} elements
   * @param {keypath} array
   * @returns [array] elements with linked animation
   */
  getElementsFlattened(elements, keyPath) {
    let elementsFlat = [];
    _.each(elements, (element, i) => {
      let newKeyPath = keyPath ? [...keyPath, i] : [i];
      let newElement = {keyPath: newKeyPath, ...element};
      if (element.elements && !_.isEmpty(element.linkedAnimationKeyPath)) {
         elementsFlat.push(newElement, ...this.getElementsFlattened(newElement.elements, newKeyPath));
      } else if (element.elements) {
        elementsFlat.push(...this.getElementsFlattened(newElement.elements, newKeyPath));
      } else if (!_.isEmpty(element.linkedAnimationKeyPath)) {
        elementsFlat.push(newElement);
      }
    });

    return elementsFlat;
  }

  renderTimelineTracks(props) {
      const { activeTimelineKeyPath, elements, animations, isTimelineActive, handleChange, getAnimationProperties, updateTimelineProperties, updatePreviewKeyPath, timelines } = props;

      const elementsFlattened = this.getElementsFlattened(elements);

     return elementsFlattened.map((element, i) => {
      const { keyPath, linkedAnimationKeyPath } = element;
      const animationProperties = getAnimationProperties(linkedAnimationKeyPath, animations);

      return (
        <TimelineTrack
          {...element}
          animationProperties={animationProperties}
          active={isTimelineActive(activeTimelineKeyPath, element)}
          key={i}
          handleChange={handleChange}
          updateTimelineProperties={updateTimelineProperties}
          updatePreviewKeyPath={updatePreviewKeyPath}
          onClick={(data) => {this.onClick(data, keyPath)}}
        />
        )
      }
    );
  }

  render () {
    console.log('TimelineEditor - render', this.props);
    const { activeTimelineKeyPath, elements, isTimelineActive, handleChange, updateTimelineProperties, updatePreviewKeyPath, timelines } = this.props;
    const timelinesFlattened = this.getTimelinesFlattened(timelines);
    const elementsFlattened = this.getElementsFlattened(elements);


    // console.log('getElementsFlattened', this.getElementsFlattened(elements) );

    // const timelinesHTML = elementsFlattened.map((timeline, i) => {
    //   const { keyPath } = timeline;

    //   return (
    //     <TimelineTrack
    //       {...timeline}
    //       active={isTimelineActive(activeTimelineKeyPath, timeline)}
    //       key={i}
    //       handleChange={handleChange}
    //       updateTimelineProperties={updateTimelineProperties}
    //       updatePreviewKeyPath={updatePreviewKeyPath}
    //       onClick={(data) => {this.onClick(data, keyPath)}}
    //     />
    //     )
    //   }
    // );


        // <div className="timelines master">
        //   <TimelineTrack {...this.props.masterTimeline} />
        // </div>



    return (
      <div className="timeline-editor">

        <Controller timelines={elementsFlattened} />
        <div className="timelines normal">
          { this.renderTimelineTracks(this.props) }
        </div>
      </div>
    );
  }
}