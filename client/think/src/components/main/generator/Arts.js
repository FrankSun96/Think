import React, { Component } from 'react';

class Arts extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {art_url, address, onLike, like} = this.props;
    
    return (
      <div className="outline">
        <div className="frame">
          <img src={`${address}${art_url}`} />
        </div>
        <div className={["like", like ? "active": null].join(' ')} onClick = {onLike}>
          <i className="fa fa-heart"></i>
        </div>
      </div>
    );
  }
}

export default Arts;