import axios from 'axios';

export const userSignupRequest = (userData) => {
  return dispatch => {
    return axios.post("http://localhost:5000/api/user",userData)
  }
}