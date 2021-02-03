import React from "react";
import PropTypes from "prop-types";
import Header from './header';
import MainPage from './main-page';
// import FavouritesPage from './favourites-page';
// import AuthorizationPage from './authorization-page';

const App = (props) => {
  return (
    <div className={`page ${props.pageClassNames}`}>
      <Header/>
      <MainPage/>
      {/* <FavouritesPage/>
      <AuthorizationPage/> */}
    </div>
  );
};

App.propTypes = {
  pageClassNames: PropTypes.string
};

export default App;
