import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import Poster from 'components/Poster';
import MovieInfo from 'components/MovieInfo';
import Spinner from 'components/Spinner';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchMovieDetail, fetchTrailerList} from 'actions/movie-actions';
import { BACKGROUND_IMG_URL } from 'configs/environment-variables';

class MovieDetailPage extends Component {
  componentDidMount() {
    this.fetchMoviesCastsAndTrailers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id && this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchMoviesCastsAndTrailers();
    }
  }

  fetchMoviesCastsAndTrailers = () => {
    this.props.fetchMovieDetail(this.props.match.params.id);
    this.props.fetchTrailerList(this.props.match.params.id);
  }

  render() {
    const { movie, trailers, isFetchingMovie, isFetchingCasts, isFetchingTrailers, movieDetailError, trailersError } = this.props;
    
    if (isFetchingMovie || isFetchingCasts || isFetchingTrailers) {
      return (<Spinner />);
    } else if (movieDetailError || trailersError) {
      return (<div>There has been an error. Please try again later</div>);
    } else if (movie.hasOwnProperty('id', 'title')) {
      const { title, vote_average, vote_count, release_date, overview, id, poster_path, backdrop_path } = movie;
      const backgroundImage = { backgroundImage: `url(${BACKGROUND_IMG_URL}${backdrop_path})` };
      return(
        <div className="movie-detail-container" style={backgroundImage}>
          <Container className="movie-detail-container__card" fluid={false}>
            <Row>
              <Col className="movie-detail-container__card-poster" sm={12} md={4}>
                <Poster
                  showInfo={false}
                  title={title}
                  voteAverage={vote_average}
                  releaseDate={release_date}
                  id={id}
                  posterPath={poster_path}
                  responsive />
              </Col>
              <Col className="movie-detail-container__card-info" sm={12} md={8}>
                <MovieInfo title={title}
                  voteAverage={vote_average}
                  voteCount={vote_count}
                  trailers={trailers}
                  releaseDate={release_date}
                  overview={overview} />
              </Col>
            </Row>
          </Container>
        </div>
      );
    } else
      return null;
  }
}

const mapStateToProps = state => ({
  isFetchingMovie: state.movieDetailReducer.isFetching,
  movie: state.movieDetailReducer.items,
  movieDetailError: state.movieDetailReducer.error,
  isFetchingTrailers: state.trailersReducer.isFetching,
  trailers: state.trailersReducer.items,
  trailersError: state.trailersReducer.error,
  isFetchingCasts: state.castsReducer.isFetching,
});

const mapDispatchToProps = dispatch => ({
  fetchMovieDetail: (movieId) => dispatch(fetchMovieDetail(movieId)),
  fetchTrailerList: (movieId) => dispatch(fetchTrailerList(movieId)),
});

MovieDetailPage.propTypes = {
  isFetchingMovie: PropTypes.bool.isRequired,
  movie: PropTypes.object.isRequired,
  movieDetailError: PropTypes.object,
  isFetchingTrailers: PropTypes.bool.isRequired,
  trailers: PropTypes.array.isRequired,
  trailersError: PropTypes.object,
  isFetchingCasts: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailPage);
