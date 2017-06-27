import React from 'react';
import classNames from 'classnames';
import BaseCSSEditor from './BaseCSSEditor';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   data: this.props.data || ''
    // };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    // console.log('changed!!!!!');
    // return 'asdasdadsadasdasd';
    // console.log(value);
    console.log(value);
    // this.setState({data: value});
    this.props.onChange(value);
  }

  render () {
    let positionClass = this.props.position ? this.props.position + '-panel' : '';
    let stateClass = this.props.active ? 'active' : '';

    let content = null;
    console.log(this.props.data);

    if (this.props.type === 'editor') {
      content = <BaseCSSEditor data={this.props.data} onChange={this.handleChange} />;
    } else {
      content = this.props.data;
    }

  	// let data = this.props.data;
    return (
      <div className={classNames('sidebar', positionClass, stateClass)}>
        <div className="content-container compiled-css">
          {content}
        </div>
      </div>
    );
  }
}