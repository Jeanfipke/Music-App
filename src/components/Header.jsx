import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      <div data-testid="header-component">
        <p>TrybeTunes</p>
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
