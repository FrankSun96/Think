import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class FlashMessage extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired
  }

  onClick = () => {
    this.props.deleteFlashMessage(this.props.message.id);
  }

  render() {
    const { type, text, id } = this.props.message;
    return (
      <li className={ classnames('flash-alert alert open animated fadeInRight faster', {
            'alert-success': type === 'success',
            'alert-warning': type === 'warning',
            'alert-error': type === 'error',
            'alert-info': type === 'info'
          })} 
          data-value = { id }
          onClick = { this.onClick }
      >
        <i  className={ classnames({
              'fas fa-exclamation-circle': type === 'warning',
              'fas fa-check-circle': type === 'success',
              'fas fa-times': type === 'error',
              'fas fa-info': type === 'info'
            })}>
        </i>
        <div className="alert-block">
          <div className="alert-title">
            { type.toUpperCase() }
          </div>
          <div className="alert-message">
            { text }
          </div>
        </div>
      </li>
    );
  }
}

export default FlashMessage;