import React, { Component } from 'react';

class ToSortHeader extends Component {
  handleClick = () => {
    this.props.onClick(this.props.sortBy)
  }

  render() {
    return (
      <th scope="col">{this.props.heading}<i onClick={this.handleClick} className="fa fa-fw fa-sort"></i></th>
    )
  }
}

export default ToSortHeader;