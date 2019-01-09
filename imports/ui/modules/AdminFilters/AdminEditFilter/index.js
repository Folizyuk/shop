import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Helpers from './../../../helpers'

import {
  subscribeFilter,
  unsubscribeFilter,
  updateFilter,
  addFilter
} from '../../../actions/filtersCreators';

import {
  subscribeProperties,
  unsubscribeProperties
} from '../../../actions/propertiesCreators';

//import './style.css';
const emptyProp = () => {
  return {prop_id: Helpers.uuidv4(), title: ''};
};

class AdminEditFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: {
        filter_by: [{...emptyProp()}]
      },
      filterId: this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.filterId) this.props.subscribeFilter(this.state.filterId);
    this.props.subscribeProperties();
  }

  componentWillUnmount() {
    if (this.props.match.params.id) this.props.unsubscribeFilter();
    this.props.unsubscribeProperties();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.filterId) this.setState({filter: {...this.state.filter, ...nextProps.filter}});
  }

  onChange = (e) => {
    this.setState({
      filter: {...this.state.filter, [e.target.name]: e.target.value.trim()}
    });
  };

  onChangeProperty = (value, index) => {
    const filter_by = this.state.filter.filter_by.slice();
    filter_by[index] = {...filter_by[index], [value.key]: value.value};
    this.setState({
      filter: {...this.state.filter, filter_by}
    });
  };

  onAddEmptyProp = (e) => {
    this.setState({
      filter: {...this.state.filter, filter_by: [...this.state.filter.filter_by, {...emptyProp()}]}
    });
  };

  onRemoveProp = (index) => {
    const filter_by = this.state.filter.filter_by.slice();
    filter_by.splice(index, 1);
    this.setState({
      filter: {...this.state.filter, filter_by}
    });
  };

  saveFilter = () => {
    if (this.state.filterId) this.props.updateFilter(this.state.filter);
    else this.props.addFilter(this.state.filter);
  };

  render() {
    const { properties } = this.props;
    const { filter } = this.state;
    return (
      <div>
        {
          this.state.filterId ? 'edit filter' : 'create filter'
        }
        <div>
          {
            filter &&
            <form>
              <div>
                <label>name</label>
                <input type="text" name="title" defaultValue={filter.title} onChange={this.onChange}/>
              </div>
              {
                filter.filter_by.map((prop, i) => {
                  return (
                    <div key={prop.prop_id}>
                      <label>property</label>
                      <select defaultValue={prop.prop_id}
                              onChange={(e) => this.onChangeProperty({
                                value: Helpers.parseMongoID(e.target.value), key: 'prop_id'}, i)
                              }>
                        <option>Select</option>
                        {
                          properties.map(p => {
                            return <option
                              key={p._id}
                              value={p._id}>
                              {p.title}
                              </option>
                          })
                        }
                      </select>
                      <input type="text"
                             value={prop.value}
                             onChange={(e) => this.onChangeProperty({value: e.target.value, key: 'title'}, i)}
                      />
                      {
                        i === (filter.filter_by.length - 1) &&
                        <button onClick={this.onAddEmptyProp}>+</button>
                      }
                      {
                        filter.filter_by.length > 1 && <button onClick={() => this.onRemoveProp(i)}>-</button>
                      }
                    </div>
                  )
                })
              }
              <div>
                <input type="button" value="Save" onClick={this.saveFilter}/>
              </div>
            </form>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filter: state.filter.data,
    properties: state.properties.data
  }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  subscribeFilter,
  unsubscribeFilter,
  updateFilter,
  addFilter,
  subscribeProperties,
  unsubscribeProperties,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminEditFilter);
