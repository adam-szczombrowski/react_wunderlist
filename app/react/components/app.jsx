import React from 'react';
import ListPanel from './lists-panel';
import TasksList from './tasks-list';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lists: this.props.lists.map(h => h.list),
      current_tasks: this.props.lists[0].tasks,
      current_list_id: this.props.lists[0].list.id,
      isBeingEdited: false
    }
    this.updateCurrentTasks = this.updateCurrentTasks.bind(this);
    this.addNewList = this.addNewList.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  addNewList(e, list_name) {
    e.preventDefault();
    const self = this
    fetch('/lists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({list: { name: list_name }})
    }).then(function(response) {
        return response.json()
      }).then(function(json) {
        const lists = self.state.lists.concat([json])
        self.setState({
          lists: lists
        })
      })
  }

  updateCurrentTasks(id = this.state.current_list_id) {
    console.log("id: ", id);
    const self = this;
    fetch('/lists/' + id + '/tasks')
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        self.setState({
          current_tasks: json,
          current_list_id: id
        })
      });
  }

  addNewTask(e, task_name) {
    e.preventDefault();
    const self = this;
    const list_id = self.state.current_list_id;
    fetch('/lists/' + list_id + '/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({task: { name: task_name, list_id: list_id }})
    })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        self.updateCurrentTasks()
      })
  }

  updateTask() {
    this.updateCurrentTasks()
  }

  render () {
    return(
      <div className="row">
        <div className="col-md-3">
          <ListPanel lists={this.state.lists} switchCurrentList={this.updateCurrentTasks} addList={this.addNewList} />
        </div>
        <div className="col-md-9">
          <TasksList tasks={this.state.current_tasks} addTask={this.addNewTask} updateTasks={this.updateCurrentTasks} editTask={this.updateTask} />
        </div>
      </div>
    )
  }
}

export default App;
