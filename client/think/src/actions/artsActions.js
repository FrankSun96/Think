import axios from 'axios';

export const getGeneratedArt = (genre) => {
  return dispatch => {
    return axios.get(`http://localhost:5000/api/images_get?genre=${genre}`);
  }
}

export const likeGeneratedArt = (image) => {
  return dispatch => {
    return axios.post('http://localhost:5000/api/images', image);
  }
}