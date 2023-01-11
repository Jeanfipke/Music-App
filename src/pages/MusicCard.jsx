import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    isLoading: false,
  };

  render() {
    const { music, albumInfo } = this.props;
    const { isLoading } = this.state;
    return (
      <div>
        {
          isLoading
            ? (
              <h2>Carregando...</h2>
            ) : (
              <div>
                <h2 data-testid="artist-name">{ albumInfo.artistName }</h2>
                <h2 data-testid="album-name">{ albumInfo.collectionName }</h2>
                {
                  music.map((test) => (
                    <div key={ test.trackId }>
                      <p>{ test.trackName }</p>
                      <audio
                        data-testid="audio-component"
                        src={ test.previewUrl }
                        controls
                      >
                        <track kind="captions" />
                        O seu navegador não suporta o elemento
                        <code>audio</code>
                        .
                      </audio>
                      <label htmlFor="favorite-song">
                        Favorita
                        <input
                          data-testid={ `checkbox-music-${test.trackId}` }
                          id="favorite-song"
                          type="checkbox"
                          onChange={ async () => {
                            this.setState({
                              isLoading: true,
                            });
                            await addSong({ test });
                            this.setState({ isLoading: false });
                          } }
                        />
                      </label>
                    </div>
                  ))
                }
              </div>
            )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.arrayOf(Object).isRequired,
  albumInfo: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
