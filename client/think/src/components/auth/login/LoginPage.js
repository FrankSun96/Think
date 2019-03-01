import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoginForm from './LoginForm'
import { userLoginRequest, setCurrentUser} from '../../../actions/loginActions';
import { addFlashMessage } from '../../../actions/flashMessages';
import login_paintings from '../../../assets/images/login_page/paintings.png';

import './Login.scss'

class LoginPage extends Component {
  static propTypes = {
    userLoginRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired
  }

  render() {
    const { userLoginRequest, addFlashMessage, setCurrentUser } = this.props;
		return (
      <div className="page">
        <div className="page-section page-section-login-background">
          <div className="page-section-login">
            <div className="login-content">
              <div className="login-image">
                <img src={ login_paintings } alt=""></img>
              </div>
              <div className="login-form">
                <span class="login-title">LOGIN </span>
                <LoginForm 
                  addFlashMessage = { addFlashMessage } 
                  userLoginRequest = { userLoginRequest }
                  setCurrentUser = { setCurrentUser }
                ></LoginForm>
              </div>
            </div>
          </div>
        </div>
      </div>
		);
	}
}

export default connect(null, { userLoginRequest, addFlashMessage, setCurrentUser })(LoginPage);