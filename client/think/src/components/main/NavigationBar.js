import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './NavigationBar.scss';
import brand from '../../assets/images/home_page/favicon.png';
class NavigationBar extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const userLinks = (
      <div className="navigation">
        <nav className="fl-left">
          <ul>
            <li>
              <Link className="navbar-font" to="/">HOME</Link>
            </li>
          </ul>
        </nav>
        <div className="profile fl-right">
          <div className="auth">
            <ul>
              <li>
                <Link className="navbar-font" to="/user/arts">{ user.username }</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );

    const guestLinks = (
      <div className="navigation">
        <nav className="fl-left">
          <ul>
            <li>
              <Link className="navbar-font" to="/">HOME</Link>
            </li>
          </ul>
        </nav>
        <div className="profile fl-right">
          <div className="auth">
            <ul>
              <li>
                <Link className="navbar-font" to="/signup">SIGN UP</Link>
              </li>
              <li>
                <Link className="navbar-font" to="/login">LOGIN</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );

		return (
      <div>
        <header className="inner">
          <div className="logo">
            <Link to="/">
              <img src={brand} width="50" height="50" alt="Think"/>
            </Link>
          </div>
          { isAuthenticated ? userLinks : guestLinks }
        </header>
        <div className="clearfix"></div>
      </div>
		);
	}
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps)(NavigationBar);