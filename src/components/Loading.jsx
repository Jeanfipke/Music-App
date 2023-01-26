import React, { Component } from 'react';
import loading from '../loading.svg';
import '../styles/loading.css';

class Loading extends Component {
  render() {
    return (
      <div data-testid="page-loading">
        <img className="ldng" src={ loading } alt="loading" />
      </div>
    );
  }
}

export default Loading;
