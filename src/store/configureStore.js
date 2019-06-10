import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { moviesReducer, castsReducer, trailersReducer, movieDetailReducer } from 'reducers/movie-reducer';

const logger = createLogger();
const rootReducer = combineReducers({
  moviesReducer,
  castsReducer,
  trailersReducer,
  movieDetailReducer
});

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, logger))
  );
}
