import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import '../styles/album.css';

class Album extends Component {
  state = {
    music: [],
    albumInfo: {},
    isLoading: false,
  };

  componentDidMount() {
    this.putSongInState();
  }

  putSongInState = async () => {
    const { match: { params: { id } } } = this.props;
    const test = await getMusics(id);
    const songs = test.filter((song) => song.trackName);
    const info = test[0];
    this.setState({
      music: songs,
      albumInfo: info,
    });
  };

  render() {
    const { music, albumInfo, isLoading } = this.state;
    return (
      <div className="album-background" data-testid="page-album">
        <Header />
        <div className="songs">
          <div className="album-info-wrap">
            <img
              width="250px"
              src={ albumInfo.artworkUrl100 }
              alt="album cover"
            />
            <div className="album-info">
              <h2
                className="album-title"
                data-testid="album-name"
              >
                { albumInfo.collectionName }
              </h2>
              <h2 data-testid="artist-name">{ albumInfo.artistName }</h2>
            </div>
          </div>
          <hr />
          <div className="favorite-songs">
            {
              music.map((song, index) => (
                <MusicCard
                  index={ index }
                  key={ song.trackId }
                  isLoading={ isLoading }
                  song={ song }
                />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
