import React, { Component } from 'react';

class ToSortHeader extends Component {
  handleClick = () => {
    this.props.onClick(this.props.sortBy)
  }

  render() {
    return (
      <th scope="col" onClick={this.handleClick}>{this.props.heading}</th>
    )
  }
}

export default ToSortHeader;