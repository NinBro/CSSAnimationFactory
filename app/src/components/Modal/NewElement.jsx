import React from 'react';
import _ from 'lodash';
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
      hideModal,
      onclickAddNewTimeline,
      onClickEditBaseCSS,
      getElementProperties,
      elements,
      keyPath,
      sample,
      newElementProps,
      showEditor,
      visible
    } = this.props;

    const elementProps = getElementProperties(keyPath, elements);
    console.log(animations);

    return (
        <Modal
          visible={visible ? visible : false}
          title="New Element"
          onOk={hideModal}
          onCancel={() => {handleElementChange(keyPath, {}, hideModal)}}
          okText="Save"
          cancelText="Cancel"
        >
          <ElementProperties
            activeElementKeyPath={keyPath}
            handleElementChange={handleElementChange}
            {...elementProps} />
          <br/><br/>
          <Element {...elementProps} />
        </Modal>
    );
  }
}