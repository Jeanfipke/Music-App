import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    music: [],
    albumInfo: {},
  };

  componentDidMount() {
    this.putSongInState();
  }

  maplegal = () => {
    const { music, albumInfo } = this.state;
    return (
      <div>
        <h2 data-testid="artist-name">{ albumInfo.artistName }</h2>
        <h2 data-testid="album-name">{ albumInfo.collectionName }</h2>
        {
          music.map((test) => (
            <div key={ test.trackId }>
              <p>{ test.trackName }</p>
              <audio
                data-testid="audio-component"
                src="{test.previewUrl}"
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
            </div>
          ))
        }
      </div>
    );
  };

  putSongInState = async () => {
    const { match: { params: { id } } } = this.props;
    console.log(id);
    const test = await getMusics(id);
    const songs = test.filter((song) => song.trackName);
    const info = test[0];
    this.setState({
      music: songs,
      albumInfo: info,
    });
  };

  render() {
    return (
      <div data-testid="page-album">
        <Header />
        { this.maplegal() }
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
