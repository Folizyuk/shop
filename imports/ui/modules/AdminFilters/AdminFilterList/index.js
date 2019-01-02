import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  subscribeFilters,
  unsubscribeFilters,
  deleteFilter
} from '../../../actions/filtersCreators';

import './style.css';

class AdminFilterList extends Component {

  componentDidMount() {
    this.props.subscribeFilters();
  }

  componentWillUnmount() {
    this.props.unsubscribeFilters();
  }

  onDelete = (id) => {
    this.props.deleteFilter(id);
  };

  render() {
    return (
      <table className="admin_filters">
        <tbody>
        <tr>
          <th>delete</th>
          <th>edit</th>
          <th>_id</th>
          <th>title</th>
        </tr>
        {
          this.props.filters.map(filter => {
            return (
              <tr key={filter._id}>
                <td>
                  <button onClick={() => this.onDelete(filter._id)}>X</button>
                </td>
                <td>
                  <Link to={`/admin/edit-filter/${filter._id._str}`}>edit</Link>
                </td>
                <td>{filter._id._str}</td>
                <td>{filter.title}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    filters: state.filters.data,
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  subscribeFilters,
  unsubscribeFilters,
  deleteFilter,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminFilterList);
