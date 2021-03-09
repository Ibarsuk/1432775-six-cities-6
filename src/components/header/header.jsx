import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import {connect} from "react-redux";

import {cities, RouterPath} from '../../const';
import {logout} from '../../store/api-actions';

const Header = ({userEmail, isAuthorized, activeCity, onLogout}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={`${RouterPath.CITIES}/${activeCity}`}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to={isAuthorized ? RouterPath.FAVORITES : RouterPath.LOGIN}>
                  <div className="header__avatar-wrapper user__avatar-wrapper"/>
                  <span className="header__user-name user__name">{userEmail || `Sign in`}</span>
                </Link>
              </li>
              {isAuthorized
                &&
                <li className="header__nav-item user">
                  <button onClick={onLogout} className="header__user-name user__name">Logout</button>
                </li>
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  userEmail: PropTypes.string,
  isAuthorized: PropTypes.bool.isRequired,
  activeCity: PropTypes.oneOf(Object.values(cities)).isRequired,
  onLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthorized: state.isAuthorized,
  activeCity: state.activeCity,
  userEmail: state.userInfo.email
});

const mapDispatchToProps = (dispatch) => ({
  onLogout() {
    dispatch(logout());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
