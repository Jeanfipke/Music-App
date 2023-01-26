import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';
import Loading from '../components/Loading';
import '../styles/favorites.css';

class Favorites extends Component {
  state = {
    isLoading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.addSongInState();
  }

  componentDidUpdate() {
    this.addSongInState();
  }

  addSongInState = async () => {
    this.setState({ favoriteSongs: await getFavoriteSongs() });
  };

  render() {
    const { favoriteSongs, isLoading } = this.state;
    return (
      <div className="favorite-background" data-testid="page-favorites">
        <Header />
        <div className="favorites-content">
          <h2 className="favorite-title">Músicas Favoritas</h2>
          {
            isLoading ? (
              <Loading />
            ) : (
              favoriteSongs.map((song, index) => (
                <MusicCard
                  index={ index }
                  isLoading={ isLoading }
                  key={ song.trackId }
                  song={ song }
                />
              ))
            )
          }
        </div>
      </div>
    );
  }
}

export default Favorites;
