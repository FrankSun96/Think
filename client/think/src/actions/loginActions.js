import axios from 'axios';
import { SET_CURRENT_USER } from '../constants'

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user
  }
};

export const userLoginRequest = (userData) => {
  return dispatch => {
    return axios.post("http://localhost:5000/api/user/login",userData)
  }
};

export const checkOnlineRequest = () => {
  return dispatch => {
    return axios.get("http://localhost:5000/api/user/online")
  }
};

