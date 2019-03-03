import React, { Component } from 'react';

import './NotFound.scss';

class NotFound extends Component {
  render() {
      return (
        <div className="page" id="fullpage">
          <div className="page-section">
            <div className="page-section-not-found">
              <div className="not-found-title">
                <span>Oops, the page does not exist!</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

export default NotFound;