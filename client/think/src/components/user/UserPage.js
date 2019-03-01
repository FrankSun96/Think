import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import UserSideBar from './sidebar/UserSideBar';
import ProfilePage from './profile/ProfilePage';
import ArtsPage from './arts/ArtsPage';

import './UserPage.scss';

class UserPage extends Component {
  render() {
    return (
      <Router>
        <div className="page">
          <div className="page-section page-section-user-background">
            <div className="page-section-user">
              <div className="user-content">
                <div className="side-bar">
                  <UserSideBar></UserSideBar>
                </div>
                <div className="display-content">
                  <Route exact path="/user" component={ ProfilePage } />
                  <Route path="/user/arts" component={ ArtsPage } />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default UserPage;
