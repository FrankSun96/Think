import axois from 'axios';

export const setAuthorizationToken = (token) => {
  if(token) {
    axois.defaults.headers.common['x-access-token'] = `${token}`;
  } else {
    delete axois.defaults.headers.common['x-access-token'];
  }
}
