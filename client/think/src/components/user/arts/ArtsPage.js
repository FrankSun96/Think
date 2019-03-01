import React, { Component } from 'react';

import Art from './Arts';

class ArtsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      img_url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/29841/jimmy.jpg'
    }
  }
  render() {
    const { img_url } = this.state;
    return (
      <div class="arts-container">
        <Art img_url={img_url}></Art>
      </div>
    );
  }
}

export default ArtsPage;
