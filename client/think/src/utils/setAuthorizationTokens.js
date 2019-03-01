import axois from 'axios';

const setAuthorizationToken = (token) => {
  if(token) {
    axois.defaults.headers.common['x-access-token'] = `${token}`;
  } else {
    delete axois.defaults.headers.common['x-access-token'];
  }
}

export default setAuthorizationToken;