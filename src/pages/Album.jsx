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
          <div>
            <h2 data-testid="artist-name">{ albumInfo.artistName }</h2>
            <h2 data-testid="album-name">{ albumInfo.collectionName }</h2>
            {
              music.map((song) => (
                <MusicCard
                  isLoading={ isLoading }
                  key={ song.trackId }
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
