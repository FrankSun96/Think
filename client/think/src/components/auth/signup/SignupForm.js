import React, { Component } from 'react';
import validator from 'validator';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

import './Signup.scss'
class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      username_error: '',
      email_error: '',
      password_error: '',
      confirm_password_error:'',
    }
  }

  static propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  }
  
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email_error, password_error, username_error, confirm_password_error, email, password, username, confirm_password } = this.state;
    if(!(email && password && confirm_password && username)) {
      if(!email) {
        this.setState({ email_error: 'Email should not be empty.'});
      }
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
      if(!(password_error || username_error || email_error || confirm_password_error)) {
        const user = {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        }
        this.props.userSignupRequest(user)
        .then(() => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'Sign up successfully.'
          });
          this.props.history.push('/');
        })
      }
    }
  }

  emailValidator = (e) => {
    e.preventDefault();
    let email = e.target.value;
    if(validator.isEmpty(email)) {
      this.setState({email_error: 'Email should not be empty'});
    } else if(!validator.isEmail(email)) {
      this.setState({email_error: 'Please input a corret email format.'});
    } else {
      this.setState({email_error: ''});
      const user = { email: email };
      this.props.userSignupRequest(user)
      .then(res => {
        if (res.data.code === "10001") {
          this.setState({email_error: res.data.message});
        }
      })
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
    const { email_error, password_error, username_error, confirm_password_error } = this.state;
    return (
      <form onSubmit={ this.onSubmit }>
        <div className="form-group">
          <input
            placeholder="Please input your email"
            value={ this.state.email }
            onChange={ this.onChange }
            onBlur={ this.emailValidator }
            type="str"
            name="email"
            className={ classnames('form-control', { 'is-invalid': email_error }) }
          />
          { email_error && <span className='form-text warning'>{ email_error }</span> }
        </div>
        <div className="form-group">
          <input
            placeholder="Please input your username"
            value={ this.state.username }
            onChange={ this.onChange }
            onBlur = { this.usernameValidator }
            type="text"
            name="username"
            className={ classnames('form-control', { 'is-invalid': username_error }) }
          />
          { username_error && <span className='form-text warning'>{ username_error }</span> }
        </div>
        <div className="form-group">
          <input
            placeholder="Please input your password"
            value={ this.state.password }
            onChange={ this.onChange }
            onBlur={ this.passwordValidator }
            type="password"
            name="password"
            className={ classnames('form-control', { 'is-invalid': password_error }) }
          />
          { password_error && <span className='form-text warning'>{ password_error }</span> }
        </div>
        <div className="form-group">
          <input
            placeholder="Please confirm your password"
            value={ this.state.confirm_password }
            onChange={ this.onChange }
            onBlur={ this.passwordConfirmValidator }
            type="password"
            name="confirm_password"
            className={ classnames('form-control', { 'is-invalid': confirm_password_error }) }
          />
          { confirm_password_error && <span className='form-text warning'>{ confirm_password_error }</span> }
        </div>
        <div className="form-group">
            <button className="btn btn-warning btn-lg">
              Sign Up
            </button>
        </div>
      </form>
    );
  }
}

export default withRouter(SignupForm);