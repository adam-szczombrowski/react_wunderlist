import React from 'react';
import List from './list';


class ListPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list_name: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.addList = this.addList.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      list_name: event.target.value
    })
  }

  addList(e) {
    e.preventDefault();
    this.props.addList(e, this.state.list_name)
  }

  render () {
    return(
      <div>
        <form onSubmit={this.addList} className="tasks-list-form form-inline">
          <div className="form-group">
            <input type="text" placeholder="list name" onChange={this.handleNameChange} className="form-control"/>
          </div>
          <input type="submit" className="btn btn-success" />
        </form>
        <ul>
          {this.props.lists.map(l => <List key={l.id} list={l} click={this.props.switchCurrentList} />)}
        </ul>
      </div>
    )
  }
}

export default ListPanel;
