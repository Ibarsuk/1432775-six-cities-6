import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

import places from '../../mock/mock-places';

import Header from '../header/header';
import MainPage from '../main-page/main-page';
import FavouritesPage from '../favourites-page/favourites-page';
import AuthorizationPage from '../authorization-page/authorization-page';
import Property from '../property/property';
import NotFound from '../not-found/not-found';
import Footer from '../footer/footer';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact>
        <Redirect to="/cities/amsterdam"/>
      </Route>
      <Route path="/login" exact>
        <div className="page page--gray page--login">
          <Header/>
          <AuthorizationPage/>
        </div>
      </Route>
      <Route path="/favorites" exact>
        <div className="page">
          <Header/>
          <FavouritesPage/>
          <Footer/>
        </div>
      </Route>
      <Route path="/cities/:city" exact>
        <div className="page page--gray page--main">
          <Header/>
          <MainPage/>
        </div>
      </Route>
      <Route path="/offer/:id" exact render={(props) => (
        <div className="page">
          <Header/>
          <Property {...places.find((place) => String(place.id) === props.match.params.id)} isSigned={true}/>
        </div>
      )}>
      </Route>
      <Route>
        <div className="page page--gray">
          <Header/>
          <NotFound/>
          <Footer/>
        </div>
      </Route>
    </Switch>
  </BrowserRouter>
);

App.propTypes = {
  match: PropTypes.object
};

export default App;
