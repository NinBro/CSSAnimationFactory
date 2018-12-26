import React from 'react';
import _ from 'lodash';
import Button from '../Button.jsx';
import { Select } from 'antd';

export default class Header extends React.Component {

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

    const { handleSampleChange, onclickAddNewTimeline, onClickEditBaseCSS, sample, showEditor } = this.props;

    return (
      <div className="navigation">
        {this.renderEditorBtn(showEditor)}
        <Button onClick={onclickAddNewTimeline}>Add Timeline</Button>
        <Button onClick={onClickEditBaseCSS}>Edit Base CSS</Button>
        <Select defaultValue={ sample } style={{ width: 120 }} onChange={handleSampleChange}>
          <Option value="none">No Preset</Option>
          <Option value="circleWheels">circleWheels</Option>
          <Option value="monkey404">monkey404</Option>
        </Select>
      </div>
    );
  }
}