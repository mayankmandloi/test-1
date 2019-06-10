import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MovieDetailPage from 'containers/MovieDetailPage';
import HomePage from 'containers/HomePage';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/movie/:id" component={MovieDetailPage} />
    </Switch>
  );
}
