import React, { Component } from 'react';
import validator from 'validator';
import PropTypes from 'prop-types'
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import { setAuthorizationToken } from '../../../utils/authorization'
import jwtDecode from 'jwt-decode';

class LoginForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			email_error: '',
			password_error: '',
		}
	}

	static propTypes = {
    userLoginRequest: PropTypes.func.isRequired,
		setCurrentUser: PropTypes.func.isRequired
	}
	
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit = (e) => {
    e.preventDefault();
    const { email, password, email_error, password_error } = this.state;
    if(!(email && password)) {
      if(!email) {
        this.setState({ email_error: 'Email should not be empyty.' });
      }
      if(!password) {
        this.setState({ password_error: 'Password should not be empty.'});
      }
		} else if(!(email_error || password_error)){
			const user = {
				email: email,
				password: password
			}
			this.props.userLoginRequest(user)
			.then(res => {
				if(res.data.code === '0') {
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
            text: 'Log in successfully.'
					});
					this.props.history.push('/');
				} else {
					this.props.addFlashMessage({
            type: 'error',
            text: res.data.message
          });
				}
			})
    } 
	}

	emailValidator = (e) => {
    let email = e.target.value;
    if(validator.isEmpty(email)) {
      this.setState({ email_error: 'Email should not be empty.' });
    } else if(!validator.isEmail(email)){
      this.setState({ email_error: 'Please input a correct email format.' });
    } else {
      this.setState({ email_error: '' });
    }
  }
  
  passwordValidator = (e) => {
    let password = e.target.value;
    if(validator.isEmpty(password)) {
      this.setState({ password_error: 'Password should not be empty.' });
    } else {
      this.setState({ password_error: '' });
    }
  }
  
	render() {
    const { email_error, password_error } = this.state;
		return (
      <form onSubmit={ this.onSubmit }>
				<div className="form-group">
					<input
						placeholder="Please input your email"
						value={ this.state.email }
						onChange={ this.onChange }
						onBlur= { this.emailValidator }
						type="str"
						name="email"
						className={ classnames('form-control', { 'is-invalid': email_error }) }
					/>
          { email_error && <span className='form-text warning'>{ email_error }</span> }
				</div>
				<div className="form-group">
					<input
            placeholder='Please input your password'
						value={ this.state.password }
            onChange={ this.onChange }
            onBlur = { this.passwordValidator }
						type="password"
						name="password"
						className={ classnames('form-control', { 'is-invalid': password_error }) }
					/>
          { password_error && <span className='form-text warning'>{ password_error }</span> }
				</div>
				<div className="form-group">
						<button className="btn btn-warning btn-lg">
							Login
						</button>
				</div>
			</form>
		);
	}
}

export default withRouter(LoginForm);