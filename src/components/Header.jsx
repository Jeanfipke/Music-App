import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../images/logo.svg';
import '../styles/header.css';
import userPic from '../userPic.png';

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
        <div className="buttons-header">
          <Link
            className="nav-btn"
            to="/search"
            data-testid="link-to-search"
          >
            Procure uma música
          </Link>
          <Link
            className="nav-btn"
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favoritos
          </Link>
          <Link
            className="nav-btn"
            to="/profile"
            data-testid="link-to-profile"
          >
            Perfil
          </Link>
        </div>
        {
          isLoading ? <Loading />
            : (
              <div className="userName">
                <img
                  src={ JSON.parse(localStorage.getItem('user')).image || userPic }
                  alt="userPic"
                />
                <p data-testid="header-user-name">
                  { JSON.parse(localStorage.getItem('user')).name }
                </p>
              </div>
            )
        }
      </div>
    );
  }
}

export default Header;
