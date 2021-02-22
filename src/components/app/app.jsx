import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

import {place as propPlace} from '../prop-types';
import {connect} from "react-redux";

import Header from '../header/header';
import MainPage from '../main-page/main-page';
import FavouritesPage from '../favourites-page/favourites-page';
import AuthorizationPage from '../authorization-page/authorization-page';
import Property from '../property/property';
import NotFound from '../not-found/not-found';
import Footer from '../footer/footer';


const App = (props) => {
  return (
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
        <Route path="/cities/:city" exact render={(properties) => (
          <div className="page page--gray page--main">
            <Header/>
            <MainPage city={properties.match.params.city}/>
          </div>
        )}>
        </Route>
        <Route path="/offer/:id" exact render={(properties) => (
          <div className="page">
            <Header/>
            <Property {...props.places.find((place) => String(place.id) === properties.match.params.id)} isSigned={true}/>
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
};

App.propTypes = {
  match: PropTypes.object,
  places: PropTypes.arrayOf(PropTypes.shape(propPlace)).isRequired
};

const mapStateToProps = (state) => ({
  places: state.places
});

export default connect(mapStateToProps)(App);
