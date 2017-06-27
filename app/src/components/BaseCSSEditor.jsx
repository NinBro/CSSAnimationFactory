import React from 'react';
// import classNames from 'classnames';

export default class BaseCSSEditor extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   value: this.props.data || ''
    // };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {

    // console.log('changedsadasdasdasdads!!!!!');
    // this.setState({data: event.target.value});
    // console.log(this.props.onChange);
    // console.log(this.state.data);
    console.log(event.target.value);
    this.props.onChange(event.target.value);
  }

  render () {

    console.log(this.props.data);

    return (
      <div>
        <textarea className="css-editor" placeholder="Enter your CSS here homie!" value={this.props.data} onChange={this.handleChange}></textarea>
      </div>
    );
  }
}