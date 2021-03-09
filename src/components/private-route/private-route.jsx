import React from "react";
import {Redirect, Route} from "react-router-dom";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import {RouterPath} from '../../const';

import Loading from '../loading/loading';

const PrivateRoute = ({path, exact, render, isAuthorized, isAuthChecked}) => {

  if (!isAuthChecked) {
    return <Loading/>;
  }

  return (
    <Route path={path} exact={exact} render={(properties) => {
      return (
        isAuthorized
          ? render(properties)
          : <Redirect to={RouterPath.LOGIN}/>
      );
    }}/>
  );
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  isAuthChecked: PropTypes.bool.isRequired,
  exact: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthorized: state.isAuthorized,
  isAuthChecked: state.isAuthChecked
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
