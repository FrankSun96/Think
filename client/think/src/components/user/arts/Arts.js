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
        </div>
        <div className="card-unlike">
          <i className="fas fa-times" onClick={ this.onClick }></i>
        </div>
      </div>
    );
  }
}

export default Arts;
