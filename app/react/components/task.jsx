import React from 'react';

class Task extends React.Component {
  constructor(props) {
    super(props)
    this.markAsDone = this.markAsDone.bind(this);
  }

  markAsDone(e) {
    const self = this;
    fetch('/lists/' + this.props.task.list_id + '/tasks/' + this.props.task.id + '/check', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    }).then(function(response) {
      return response.json();
    }).then(function(json) {
      self.props.updateTasks()
    })
  }

  render () {
    return(
      <div className="list-item-wrapper">
        <button onClick={this.markAsDone} className="task-done btn btn-danger">done</button>
        <li onClick={() => this.props.click(this.props.task)}>{this.props.task.name}</li>
        <div className="clearfix"></div>
      </div>
    )
  }
}

export default Task;
