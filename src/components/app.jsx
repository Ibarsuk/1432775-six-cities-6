import React from "react";
import PropTypes from "prop-types";
import Header from './header';
import MainPage from './main-page';
import FavouritesPage from './favourites-page';
import AuthorizationPage from './authorization-page';
import Property from './property';
import NotFound from './not-found';
import Footer from './footer';
import places from '../mock/mock-places';
import {BrowserRouter, Switch, Route} from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Switch>
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
      <Route path="/:city?" exact>
        <div className="page page--gray page--main">
          <Header/>
          <MainPage/>
        </div>
      </Route>
      <Route path="/offer/:id" exact render={(props) => (
        <div className="page">
          <Header/>
          <Property placeInfo={places.find((place) => String(place.id) === props.match.params.id)} isSigned={true}/>
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
