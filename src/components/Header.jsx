import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../images/logo.svg';
import '../styles/header.css';

class Header extends Component {
  state = {
    isLoading: true,
  };

  async componentDidMount() {
    await getUser();
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div className="header-background" data-testid="header-component">
        <img className="logo" src={ logo } alt="trybe tunes logo" />
        <Link to="/search" data-testid="link-to-search">Procure um música</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        {
          isLoading ? <Loading />
            : (
              <p data-testid="header-user-name">
                { JSON.parse(localStorage.getItem('user')).name }
              </p>
            )
        }
      </div>
    );
  }
}

export default Header;
