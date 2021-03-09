import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import browserHistory from '../../browser-history';
import {cities, RouterPath} from '../../const';
import {authorize} from '../../store/api-actions';

const AuthorizationPage = ({activeCity, onSubmit, isAuthorized}) => {
  const [isRequestFailed, setIsRequestFailed] = useState(false);
  const [formData, setFormdata] = useState({
    email: ``,
    password: ``
  });

  const onLoginFail = () => setIsRequestFailed(true);
  const onLoginSuccess = () => browserHistory.goBack();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({
      email: formData.email,
      password: formData.password
    }, onLoginSuccess, onLoginFail);
  };

  const handleFormChange = ({target: {name, value}}) => {
    setFormdata((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  useEffect(() => {
    if (isAuthorized) {
      browserHistory.push(`/`);
    }
  });

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">{isRequestFailed ? `RequestFailed` : `Sign in`}</h1>
          <form className="login__form form" action="#" method="post" onChange={handleFormChange}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" type="email" name="email" placeholder="Email" required=""/>
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" type="password" name="password" placeholder="Password" required=""/>
            </div>
            <button onClick={handleSubmit} className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to={`${RouterPath.CITIES}/${activeCity}`}>
              <span>{activeCity}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

AuthorizationPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  activeCity: PropTypes.oneOf(Object.values(cities)).isRequired,
  isAuthorized: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  activeCity: state.activeCity,
  isAuthorized: state.isAuthorized
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(authData, onLoginSuccess, onLoginFailCallback) {
    dispatch(authorize(authData, onLoginSuccess, onLoginFailCallback));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationPage);
