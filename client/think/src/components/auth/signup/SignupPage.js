import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userSignupRequest } from '../../../actions/sigupActions';
import { addFlashMessage } from '../../../actions/flashMessages';
import SignupForm from './SignupForm';

import './Signup.scss';

class SignupPage extends Component {
  static propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  }
  
	render() {
    const { addFlashMessage, userSignupRequest } = this.props;
		return (
      <div className="page">
        <div className="page-section page-section-signup-background">
          <div className="page-section-signup">
            <div className="signup-form">
              <span class="signup-title">GENERATE YOUR OWN ARTS </span>
              <SignupForm addFlashMessage={ addFlashMessage } userSignupRequest= { userSignupRequest }></SignupForm>
            </div>
          </div>
        </div>
      </div>
		);
	}
}

export default connect(null, { userSignupRequest, addFlashMessage })(SignupPage);