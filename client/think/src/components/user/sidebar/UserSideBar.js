import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './UserSideBar.scss';
class UserSideBar extends Component {
  render() {
    return (
      <div className="user-side-bar">
        <ul className="user-side-bar-list">
          <li className="side-bar-item">
            <Link className="btn-split" to="/user" data-hover="RPOFILE">
              <span>RPOFILE</span>
            </Link>
          </li>
          <li className="side-bar-item">
            <Link className="btn-split" to="/user/arts" data-hover="MY ARTS">
              <span>MY ARTS</span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default UserSideBar;