import React from "react";
import PropTypes from "prop-types";
import {Router, Switch, Route, Redirect} from "react-router-dom";

import history from '../../browser-history';
import {Routes, cities} from '../../const';

import MainPage from '../main-page/main-page';
import FavouritesPage from '../favourites-page/favourites-page';
import AuthorizationPage from '../authorization-page/authorization-page';
import Property from '../property/property';
import NotFound from '../not-found/not-found';
import PrivateRoute from "../private-route/private-route";

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path={Routes.ROOT} exact render={() => <Redirect to={`${Routes.CITIES}/${cities.Amsterdam}`}/>}/>
        <Route path={`${Routes.CITIES}/:city`} exact component={MainPage}/>
        <Route path={Routes.LOGIN} exact component={AuthorizationPage}/>
        <PrivateRoute path={Routes.FAVORITES} exact component={FavouritesPage}/>
        <Route path={`${Routes.OFFER}/:id`} exact component={Property}/>
        <Route path={[Routes.NOT_FOUND, ``]} component={NotFound}/>
      </Switch>
    </Router>
  );
};

App.propTypes = {
  match: PropTypes.object,
};

export default App;
