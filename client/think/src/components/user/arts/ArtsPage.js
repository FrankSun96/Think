import React, { Component } from 'react';
import { connect } from 'react-redux';

import Art from './Arts';
import { getArtLists, unlikeGeneratedArt } from '../../../actions/artsActions';

class ArtsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      myart: []
    }
  }
  
  componentWillMount() {
    this.props.getArtLists()
    .then(res => {
      if(res.data.code === '0') {
        this.setState({
          myart: res.data.images
        })
      }
    })
  }

  unLikeHandler = id => {
    this.props.unlikeGeneratedArt(id)
    .then(res => {
      if(res.data.code === "0") {
        const newArts = this.state.myart.filter(art => {
          return art.image_id !== id;
        })
        this.setState({
          myart: newArts
        })
      }
    })
  }

  render() {
    const { myart } = this.state;
    const abstractList = myart.map(art => {
        if(art.image_genre === "abstract") {
          return <Art 
                    key={art.image_id} 
                    image_info = {art}
                    unlikeGeneratedArt = {this.unLikeHandler}
                  />
        } 
      }
    );
    const portraitList = myart.map(art => {
      if(art.image_genre === "portrait") {
        return <Art key={art.image_id} image_info = {art}/>
      }
    }
  );
    return (
      <div className="arts-display">
        <div className="title">
          <div className="title-word">ABSTRACT</div>
        </div>
        <div className="arts-container">
          { abstractList }
        </div>
        <div className="title gap">
          <div className="title-word">PORTRAIT</div>
        </div>
        <div className="arts-container">
          { portraitList }
        </div>
      </div>
    );
  }
}

export default connect(null, { getArtLists, unlikeGeneratedArt })(ArtsPage);