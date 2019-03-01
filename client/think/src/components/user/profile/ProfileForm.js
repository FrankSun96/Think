import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import jwtDecode from 'jwt-decode';
import { setAuthorizationToken } from '../../../utils/authorization'

class ProfileForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      username_error: '',
      password_error: '',
      confirm_password_error:'',
    }
  }

  static propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { user } = this.props.auth
    this.setState({
      email: user.email,
      username: user.username
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { password_error, username_error, confirm_password_error, password, username, confirm_password } = this.state;
    if(!( password && confirm_password && username)) {
      if(!password) {
        this.setState({ password_error: 'Password should not be empty.'});
      }
      if(!confirm_password) {
        this.setState({ confirm_password_error: 'Password should not be empty.'});
      }
      if(!username) {
        this.setState({ username_error: 'Username should not be empty.'});
      }
    } else {
      if(!(password_error || username_error || confirm_password_error)) {
        const user = {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          profile_img: 'default.jpg'
        }
        this.props.userUpdatenRequest(user)
        .then((res) => {
          console.log(res);
          const token = res.data.token;
					localStorage.setItem('token', token);
					const { email, profile_img, username } = jwtDecode(token);
					let user = {
						email : email,
						profile_img: profile_img,
						username: username
					}
					setAuthorizationToken(token);
					this.props.setCurrentUser(user);
          this.props.addFlashMessage({
            type: 'success',
            text: 'Update successfully.'
          });
        })
      }
    }
  }

  usernameValidator = (e) => {
    let username = e.target.value;
    if(validator.isEmpty(username)) {
      this.setState({username_error: 'Username should not be empty.'})
    } else {
      this.setState({username_error: ''})
    }
  }

  passwordValidator = (e) => {
    let password = e.target.value;
    if(validator.isEmpty(password)) {
      this.setState({password_error: 'Password should not be empty.'})
    } else {
      this.setState({password_error:''})
    }
  }

  passwordConfirmValidator = (e) => {
    let confirm = e.target.value;
    if(validator.isEmpty(confirm)) {
      this.setState({confirm_password_error:'Password should not be empty.'})
    } else {
      const password = this.state.password;
      if(password !== confirm){
        this.setState({confirm_password_error:'password does not match.'})
      } else {
        this.setState({confirm_password_error:''})
      }
    }
  }

  render() {
    const { password_error, username_error, confirm_password_error } = this.state;
    return (
      <form onSubmit={ this.onSubmit } className="profile">
        <div className="form-group">
          <label className="profile-label">Email</label>
          <input
            readOnly 
            value={ this.state.email }
            className={ classnames('form-control') }
          />
        </div>
        <div className="form-group">
          <label className="profile-label">Username</label>
          <input
            value={ this.state.username }
            onChange={ this.onChange }
            onBlur = { this.usernameValidator }
            type="text"
            name="username"
            className={ classnames('form-control', { 'is-invalid': username_error }) }
          />
          { username_error && <span className='form-text text-muted'>{ username_error }</span> }
        </div>
        <div className="form-group">
          <label className="profile-label">Password</label>
          <input
            value={ this.state.password }
            onChange={ this.onChange }
            onBlur={ this.passwordValidator }
            type="password"
            name="password"
            className={ classnames('form-control', { 'is-invalid': password_error }) }
          />
          { password_error && <span className='form-text text-muted'>{ password_error }</span> }
        </div>
        <div className="form-group">
          <label className="profile-label">Confirm Password</label>
          <input
            value={ this.state.confirm_password }
            onChange={ this.onChange }
            onBlur={ this.passwordConfirmValidator }
            type="password"
            name="confirm_password"
            className={ classnames('form-control', { 'is-invalid': confirm_password_error }) }
          />
          { confirm_password_error && <span className='form-text text-muted'>{ confirm_password_error }</span> }
        </div>
        <div className="form-group">
            <button className="btn btn-warning btn-lg profile-btn">
              Update
            </button>
        </div>
      </form>
    );
  }
}

ProfileForm.propTypes = {
  auth: PropTypes.object.isRequired
}


const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps)(ProfileForm);