import React from 'react';
import _ from 'lodash';
import Button from '../Button.jsx';
import ElementProperties from '../Editor/Sidebar/ElementProperties.jsx';
import Element from '../Preview/Element.jsx';
import { Select, Modal } from 'antd';

export default class Header extends React.Component {

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

  /*
   * @param {boolean} showEditor
   * @returns {node}
   */
  renderEditorBtn(showEditor) {
    const { onClickHideEditor, onClickShowEditor } = this.props;
    let element;
    if (showEditor) {
      element = (
        <Button onClick={onClickHideEditor}>
          Hide Editor
        </Button>
      );
    } else {
      element = (
        <Button onClick={onClickShowEditor}>
          Show Editor
        </Button>
      );
    }

    return element;
  }

  render() {

    const { handleElementChange,
      handleSampleChange,
      onclickAddNewTimeline,
      onClickEditBaseCSS,
      sample,
      showEditor,
      showModal
  } = this.props;
    const { elementKeyPath, newElementProps } = this.state;

    return (
      <div className="navigation">
        {this.renderEditorBtn(showEditor)}
        <Button onClick={onclickAddNewTimeline}>Add Timeline</Button>
        <Button onClick={onClickEditBaseCSS}>Edit Base CSS</Button>
        <Select defaultValue={ sample } style={{ width: 120 }} onChange={handleSampleChange}>
          <Option value="empty">No Preset</Option>
          <Option value="circleWheels">circleWheels</Option>
          <Option value="monkey404">monkey404</Option>
        </Select>
        <Button onClick={showModal}>+ New Element</Button>


        <Modal
          title="New Element"
          visible={this.state.showModal}
          onOk={this.hideModal}
          onCancel={this.hideModal}
        >
          <ElementProperties
            activeElementKeyPath={elementKeyPath}
            handleElementChange={handleElementChange}
            {...newElementProps} />
          <br/><br/>
          <Element {...newElementProps} />
        </Modal>

      </div>
    );
  }
}