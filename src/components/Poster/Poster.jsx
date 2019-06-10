import React from 'react';
import { IMAGE_URL } from 'configs/environment-variables'
import PropTypes from 'prop-types';

const Poster = ({ id, posterPath, title, voteAverage, releaseDate, showInfo }) => {
  return(
    <div className="poster-container">
      <img className="poster-container__img" key={id} alt="poster-preview" src={ IMAGE_URL + 'w342/' + posterPath } />
      { showInfo &&
        <div className="poster-container__header">
          <span className="poster-container__header-title">{title}</span>
          <span className="poster-container__header-subtitle">{voteAverage}/10 {releaseDate.substring(0,4)}</span>
        </div>
      }
    </div>
  );
}

Poster.propTypes = {
  showInfo: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  posterPath: PropTypes.string.isRequired,
  voteAverage: PropTypes.number,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string,
};

export default Poster;
