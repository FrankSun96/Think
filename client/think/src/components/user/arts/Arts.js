import React, { Component } from 'react';
import './Arts.scss';
class Arts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img_url: this.props.img_url
    }
  }
  render() {
    const { img_url } = this.state
    return (
      <div className="art-card-container">
        <div className="art-card">
          <div className="art-side"><img src={img_url} alt=""></img>
          </div>
          <div className="art-side art-back">Jimmy Eat World</div>
        </div>
      </div>
    );
  }
}

export default Arts;
