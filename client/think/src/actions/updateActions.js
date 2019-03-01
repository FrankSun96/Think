import axios from 'axios';

export const userUpdatenRequest = (userData) => {
  return dispatch => {
    return axios.put("http://localhost:5000/api/user",userData)
  }
};
