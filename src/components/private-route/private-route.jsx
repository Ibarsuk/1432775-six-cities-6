import React from "react";
import {Redirect, Route} from "react-router-dom";
import PropTypes from "prop-types";

import {useSelector} from "react-redux";

import {getAuthStatus, getIfAuthChecked} from "../../store/reducers/user/selectors";

import {Routes} from '../../const';

import Loading from '../loading/loading';

const PrivateRoute = ({path, exact, component: Component}) => {

  const isAuthorized = useSelector(getAuthStatus);
  const isAuthChecked = useSelector(getIfAuthChecked);

  if (!isAuthChecked) {
    return <Loading/>;
  }

  return (
    <Route path={path} exact={exact} render={(properties) => {
      return (
        isAuthorized
          ? <Component {...properties}/>
          : <Redirect to={Routes.LOGIN}/>
      );
    }}/>
  );
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  exact: PropTypes.bool
};

export default PrivateRoute;
