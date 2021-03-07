import React from "react";
import {Redirect, Route} from "react-router-dom";
import PropTypes from "prop-types";

import {connect} from "react-redux";

const PrivateRoute = ({path, exact, render, isAuthorized}) => {
  return (
    <Route path={path} exact={exact} render={(properties) => {
      return (
        isAuthorized
          ? render(properties)
          : <Redirect to="/login"/>
      );
    }}/>
  );
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  exact: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthorized: state.isAuthorized
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
