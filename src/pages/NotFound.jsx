import React, { Component } from 'react';
import '../styles/notfound.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import plug from '../images/plug-disconnected-svgrepo-com.svg';

class NotFound extends Component {
  render() {
    return (
      <div className="nf-div" data-testid="page-not-found">
        <div className="div404">
          <h1>404</h1>
          <img src={ plug } alt="disconected plug" />
        </div>
        <p>Esta página não existe 😥</p>
        <Link to="/search" className="home-btn">Voltar para a página inicial</Link>
      </div>
    );
  }
}

export default NotFound;
