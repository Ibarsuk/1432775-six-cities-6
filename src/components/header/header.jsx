import React from "react";
import {Link} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";

import {getAuthStatus, getUserInfo} from "../../store/reducers/user/selectors";
import {getActiveCity} from "../../store/reducers/work-process/selectors";

import {Routes} from '../../const';
import {logout} from '../../store/api-actions';

const Header = () => {
  const isAuthorized = useSelector(getAuthStatus);
  const activeCity = useSelector(getActiveCity);
  const userEmail = useSelector(getUserInfo).email;
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout());

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={`${Routes.CITIES}/${activeCity}`}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to={isAuthorized ? Routes.FAVORITES : Routes.LOGIN}>
                  <div className="header__avatar-wrapper user__avatar-wrapper"/>
                  <span className="header__user-name user__name">{userEmail || `Sign in`}</span>
                </Link>
              </li>
              {isAuthorized
                &&
                <li className="header__nav-item user">
                  <button onClick={handleLogout} className="header__user-name user__name">Logout</button>
                </li>
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
