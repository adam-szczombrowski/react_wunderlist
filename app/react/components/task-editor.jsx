import React from 'react';

class TaskEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      task_name: this.props.task.name
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.editTask = this.editTask.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      task_name: event.target.value
    })
  }

  editTask(e) {
    e.preventDefault();
    const self = this;
    const list_id = self.props.task.list_id;
    const task_id = self.props.task.id;
    fetch('/lists/' + list_id + '/tasks/' + task_id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({task: { name: self.state.task_name }})
    })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        self.props.editTask()
      })
  }

  render () {
    return(
      <div>
        <p className="text-center">Edit {this.props.task.name}:</p>
        <form onSubmit={this.editTask} className="form-inline">
          <div className="form-group">
            <input type="text" value={this.state.task_name} onChange={this.handleNameChange} className="form-control"/>
          </div>
          <input type="submit" className="btn btn-success"/>
        </form>
      </div>
    )
  }
}

export default TaskEditor;
