import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Task from './Task.js';
import AccountsUIWrapper from './AccountsUIWrapper';
import { bindActionCreators } from 'redux';
import { addTasks, getTasks, TASKS } from './actions/tasks-action';
import { connect } from 'react-redux';

import { stopSubscription } from 'meteor-redux-middlewares';

// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  componentDidMount() {
    this.props.getTasks();
  }

  componentWillUnmount() {
    this.props.stopTasksSubscription();
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

    this.props.addTasks(text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderTasks() {
    let filteredTasks = this.props.tasks.tasks;
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
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.tasks.incompleteCount})</h1>


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

          { this.props.tasks.ready ?
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

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getTasks,
  stopTasksSubscription: stopSubscription(TASKS),
  addTasks
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
