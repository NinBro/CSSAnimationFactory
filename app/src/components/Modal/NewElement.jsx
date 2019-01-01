import React from 'react';
import _ from 'lodash';
import AnimationProperties from '../Editor/Sidebar/AnimationProperties.jsx';
import Element from '../Preview/Element.jsx';
import ElementProperties from '../Editor/Sidebar/ElementProperties.jsx';
import { Modal } from 'antd';

export default class NewElement extends React.Component {

  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.state = {
      showModal: false,
      newElementProps: {
        name: 'New Element',
        css: 'width: 100px; height: 100px; background: blue;'
      }
    }
  }

  /*
   * @returns {array}
   */
  getNewPath(elements) {
    const newPath = elements.length;
    return [newPath];
  }

  showModal() {
    const { elements } = this.props;
    const newPath = this.getNewPath(elements);
    this.props.handleElementChange(newPath, this.state.newElementProps);
    // const newElementProps = .assign(_.cloneDeep(elements), element);
    this.setState({
      showModal: true,
      elementKeyPath: newPath
    });
  }

  hideModal() {
    this.setState({
      showModal: false
    });
  }

  render() {

    const {
      animations,
      handleElementChange,
      handleSampleChange,
      handleChange_,
      hideModal,
      onclickAddNewTimeline,
      onClickEditBaseCSS,
      getAnimationProperties,
      getElementProperties,
      getProperties,
      elements,
      keyPath,
      sample,
      newElementProps,
      showEditor,
      visible,
      updateTimelineProperties
    } = this.props;

    const elementProps = getElementProperties(keyPath, elements);
    const animationProperties = getAnimationProperties(elementProps.linkedAnimationKeyPath, animations);
    // console.log(animations);

    return (
        <Modal
          visible={visible ? visible : false}
          title="New Element"
          onOk={hideModal}
          onCancel={
            () => {
              handleElementChange(
                keyPath,
                {},
                () => {
                  handleChange_(
                    elementProps.linkedAnimationKeyPath,
                    'animation',
                    {},
                    () => {
                      hideModal();
                    }
                  );
                }
              );
            }
          }
          okText="Save"
          cancelText="Cancel"
        >
          <ElementProperties
            activeElementKeyPath={keyPath}
            handleElementChange={handleElementChange}
            {...elementProps} />
          <AnimationProperties
            { ...animationProperties }
            keyPath={elementProps.linkedAnimationKeyPath}
            updateTimelineProperties={updateTimelineProperties}
            onChange={handleChange_} />
          <br/><br/>
          <Element
          {...elementProps}
          getProperties={getProperties} />
        </Modal>
    );
  }
}