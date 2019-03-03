import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './UserSideBar.scss';
class UserSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      art_flag: true
    }
  }
  
  onClick = e => {
    const now_page = e.target.dataset.value;
    console.log(now_page);
    if(now_page === 'arts') {
      this.setState({
        art_flag: true
      });
    } else {
      this.setState({
        art_flag: false
      });
    }
  }

  render() {
    const { art_flag } = this.state
    return (
      <div className="user-side-bar">
        <ul className="user-side-bar-list">
          <li className={art_flag ? "side-bar-active": "side-bar-item"}>
            <Link 
              className="btn-split"
              to="/user/arts" 
              data-hover="MY ARTS"
              data-value="arts"
              onClick={this.onClick}
            >
              <span data-value="arts">MY ARTS</span>
            </Link>
          </li>
          <li className={art_flag ? "side-bar-item": "side-bar-active"}>
            <Link 
              className="btn-split"
              to="/user" 
              data-hover="RPOFILE"
              data-value="profile"
              onClick={this.onClick}
            >
              <span data-value="profile">RPOFILE</span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default UserSideBar;