import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {

  render() {
    return (
      <header>
        <nav>
          <NavLink to="/" exact={true} activeClassName='active'>Home</NavLink>
          <NavLink to="/admin" activeClassName='active'>Admin</NavLink>
        </nav>
      </header>
    )
  }

}

export default Header;