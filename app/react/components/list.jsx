import React from 'react';

class List extends React.Component {
  render () {
    return(
      <div className="list-item-wrapper">
        <li onClick={() => this.props.click(this.props.list.id)}>{this.props.list.name}</li>
      </div>
    )
  }
}

export default List;
