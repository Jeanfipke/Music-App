import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    isButtonDisabled: true,
    // isLoading: false,
  };

  isValue = ({ target: { value } }) => {
    const dois = 2;
    if (value.length >= dois) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  };

  render() {
    const { isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            placeholder="digite o nome de um artista ou banda"
            type="text"
            data-testid="search-artist-input"
            onChange={ this.isValue }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ isButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
