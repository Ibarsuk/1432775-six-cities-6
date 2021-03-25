import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import {Routes, cities} from '../../const';

import MainPage from '../main-page/main-page';
import FavouritesPage from '../favourites-page/favourites-page';
import AuthorizationPage from '../authorization-page/authorization-page';
import Property from '../property/property';
import NotFound from '../not-found/not-found';
import PrivateRoute from "../private-route/private-route";

const App = () => {
  return (
    <Switch>
      <PrivateRoute path={Routes.FAVORITES} exact component={FavouritesPage}/>
      <Route path={Routes.ROOT} exact render={() => <Redirect to={`${Routes.CITIES}/${cities.Paris}`}/>}/>
      <Route path={Routes.LOGIN} exact component={AuthorizationPage}/>
      <Route path={`${Routes.CITIES}/:city`} exact component={MainPage}/>
      <Route path={`${Routes.OFFER}/:id`} exact component={Property}/>
      <Route path={[Routes.NOT_FOUND, ``]} component={NotFound}/>
    </Switch>
  );
};

export default App;
