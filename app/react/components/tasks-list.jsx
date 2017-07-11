import React from 'react';
import Task from './task';
import TaskEditor from './task-editor';

class TasksList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskName: '',
      currentTask: null,
      taskListClass: 'col-md-12',
      taskEditorClass: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.updateCurrentTask = this.updateCurrentTask.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      taskName: event.target.value
    })
  }

  addTask(e) {
    e.preventDefault();
    this.props.addTask(e, this.state.taskName)
  }

  updateCurrentTask(task) {
    this.setState({
      currentTask: task,
      taskListClass: 'col-md-8',
      taskEditorClass: 'col-md-4'
    })
  }

  render () {
    var editor = null
    if(this.state.currentTask != null){
      editor = <TaskEditor editTask={this.props.editTask} task={this.state.currentTask} />
    }

    return(
      <div>
        <div className={this.state.taskListClass}>
          <form onSubmit={this.addTask} className="tasks-list-form form-inline">
            <div className="form-group">
              <input type="text" placeholder="task name" onChange={this.handleNameChange} className="form-control"/>
            </div>
            <input type="submit" className="btn btn-success" />
          </form>
          <ul className="list">
            {this.props.tasks.map(t => <Task key={t.id} task={t} updateTasks={this.props.updateTasks} click={this.updateCurrentTask} />)}
          </ul>
        </div>
        <div className={this.state.taskEditorClass}>
          {editor}
        </div>
      </div>
    )
  }
}

export default TasksList;
