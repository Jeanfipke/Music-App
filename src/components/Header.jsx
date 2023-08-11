import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../images/logo.svg';
import '../styles/header.css';
import userPic from '../userPic.png';
import Vector from '../Vector.svg';
import Vector1 from '../Vector1.svg';

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
            <img src={ Vector } alt="vector" />
            <p>Pesquisa</p>
          </Link>
          <Link
            className="nav-btn"
            to="/favorites"
            data-testid="link-to-favorites"
          >
            <img src={ Vector1 } alt="" />
            <p>Favoritos</p>
          </Link>
        </div>
        {
          isLoading ? <Loading />
            : (
              <Link
                className="nav-btn"
                to="/profile"
                data-testid="link-to-profile"
              >
                <img
                  src={ JSON.parse(localStorage.getItem('user')).image || userPic }
                  alt="userPic"
                />
                <p className="userName" data-testid="header-user-name">
                  { JSON.parse(localStorage.getItem('user')).name }
                </p>
              </Link>
            )
        }
      </div>
    );
  }
}

export default Header;
