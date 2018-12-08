import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';

import { Tasks } from '../api/tasks.js';
import Task from './Task.js';
import AccountsUIWrapper from './AccountsUIWrapper';
import { bindActionCreators } from 'redux';
import {getTasks}  from './actions/tasks-action';
import { connect } from 'react-redux';

// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  componentDidMount() {
    this.props.loadTasks();
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return (
        <Task
          key={task._id}
          task={task}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {
    console.log(this.props)
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>


          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Tasks
          </label>

          <AccountsUIWrapper />

          { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new tasks"
              />
            </form> : ''
          }
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

/*function mapStateToProps(state) {
  console.log(state)

  return {
    tasks: state.todos.tasks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    tasksActions: bindActionCreators(getTasks, dispatch)
  }
}*/

const mapStateToProps = state => {
  console.log(state);

  return {
    tasks: state.tasks.tasks
  }
};


const mapDispatchToProps = dispatch => ({
  loadTasks: () => dispatch(getTasks()),
  //loadTasks: bindActionCreators(getTasks, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

/*
export default withTracker(() => {
  Meteor.subscribe('tasks.fetch');

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);*/
