import React from 'react';
import ReactDOM from 'react-dom';
import './reset.scss';

import NavigationBar from './components/main/NavigationBar'
import HomePage from './components/main/HomePage';
import LoginPage from './components/auth/login/LoginPage';
import SignupPage from './components/auth/signup/SignupPage';
import UserPage from './components/user/UserPage';
import requireAuth from './utils/requireAuth';
import NotFound from './components/main/NotFound';
import FlashMessagesList from './components/flash/FlashMessagesList';

import * as serviceWorker from './serviceWorker';

import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';

import { Provider } from 'react-redux';

import { setAuthorizationToken } from './utils/authorization';
import { setCurrentUser, checkOnlineRequest } from './actions/loginActions';
import jwtDecode from 'jwt-decode';

const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(thunk,logger)
	)
);

if (localStorage.token) {
	setAuthorizationToken(localStorage.token);
	const { username, email, profile_img } = jwtDecode(localStorage.token);
			let user = {
				email,
				username, 
				profile_img
			}
	store.dispatch(setCurrentUser(user));
	store.dispatch(checkOnlineRequest()).then(res => {
		if(res.data.code === "40101") {
			setAuthorizationToken(null);
			localStorage.removeItem("token");
			let user = {}
			store.dispatch(setCurrentUser(user));
		}
	});
}

ReactDOM.render(
	<Provider store={ store }>
		<Router>
      <div className="app">
        <NavigationBar />
				<FlashMessagesList />
				<Switch>
					<Route exact path="/" component={ HomePage} />
					<Route path="/login" component={ LoginPage } />
					<Route path="/signup" component={ SignupPage } />
					<Route path="/user" component={ requireAuth(UserPage) }/>
					<Route path="*" component={ NotFound}/>
				</Switch>
      </div>
    </Router>
	</Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
