import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProfileForm from './ProfileForm'
import { userUpdatenRequest } from '../../../actions/updateActions';
import { addFlashMessage } from '../../../actions/flashMessages';
import { setCurrentUser } from '../../../actions/loginActions';

import './Profile.scss'

class ProfilePage extends Component {
  static propTypes = {
    userUpdatenRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired
  }

  render() {
    const { userUpdatenRequest, addFlashMessage, setCurrentUser } = this.props;
		return (
			<div className="profile-section">
        <div className="profile-form"> 
          <span className="profile-title">MY PROFILE</span>
          <ProfileForm 
            addFlashMessage = { addFlashMessage } 
            userUpdatenRequest = { userUpdatenRequest }
            setCurrentUser = { setCurrentUser }
          ></ProfileForm>
        </div>
      </div>
		);
	}
}

export default connect(null, { userUpdatenRequest, addFlashMessage, setCurrentUser })(ProfilePage);