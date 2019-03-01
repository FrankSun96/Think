import React, { Component } from 'react';
import './Arts.scss';
class Arts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: 'http://localhost:5000',
      image_info: this.props.image_info
    }
  }
  onClick = e => {
    e.preventDefault();
    const { image_info } = this.state;
    this.props.unlikeGeneratedArt(image_info.image_id);
  }

  render() {
    const { image_info, address } = this.state;
    return (
      <div className="art-card-container">
        <div className="art-card">
          <div className="art-side"><img src={`${address}${image_info.image_url}`} alt={image_info.image_id}></img>
          </div>
          <div className="art-side art-back">
            <button className="btn btn-warning btn-unlike" onClick={ this.onClick }>
              Unlike
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Arts;
