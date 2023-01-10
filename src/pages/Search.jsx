import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbunsAPIs from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    isButtonDisabled: true,
    artistChosenPrint: '',
    artistChosen: '',
    album: [],
    isLoading: false,
    searchResult: false,
  };

  isValue = ({ target: { value } }) => {
    const dois = 2;
    if (value.length >= dois) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
    this.setState({ artistChosen: value });
  };

  render() {
    const {
      isButtonDisabled,
      artistChosenPrint,
      artistChosen,
      isLoading,
      searchResult,
      album,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          {
            isLoading ? <Loading />
              : (
                <>
                  <input
                    placeholder="digite o nome de um artista ou banda"
                    type="text"
                    data-testid="search-artist-input"
                    onChange={ this.isValue }
                    value={ artistChosen }
                  />
                  <button
                    data-testid="search-artist-button"
                    type="submit"
                    disabled={ isButtonDisabled }
                    onClick={ async (event) => {
                      event.preventDefault();
                      this.setState({ isLoading: true });
                      this.setState({
                        album: await searchAlbunsAPIs(artistChosen),
                      }, async () => {
                        if (await searchAlbunsAPIs(artistChosen) <= 0) {
                          this.setState({ album: 'Nenhum album encontrado' });
                        }
                      });
                      this.setState({
                        artistChosenPrint: artistChosen,
                        artistChosen: '',
                        isLoading: false,
                        searchResult: true,
                      });
                    } }
                  >
                    Pesquisar
                  </button>
                </>
              )
          }
        </form>
        {
          searchResult ? (
            <p>
              Resultado de álbuns de:
              {' '}
              { artistChosenPrint }
            </p>
          ) : (
            <p />
          )
        }
        {
          typeof album === 'string'
            ? (
              <h2>Nenhum álbum foi encontrado</h2>
            ) : (
              album.map((ArtistChosenAlbum) => (
                <Link
                  to={ `/album/${ArtistChosenAlbum.collectionId}` }
                  key={ ArtistChosenAlbum.collectionId }
                  data-testid={
                    `link-to-album-${ArtistChosenAlbum.collectionId}`
                  }
                >
                  <img
                    src={ ArtistChosenAlbum.artworkUrl100 }
                    alt="album cover"
                  />
                  <p>{ ArtistChosenAlbum.collectionName }</p>
                  <p>{ ArtistChosenAlbum.artistName }</p>
                </Link>
              )))
        }
      </div>
    );
  }
}

export default Search;
