import React, {useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import browserHistory from '../../browser-history';
import {cities} from '../../const';
import {authorize} from '../../store/api-actions';

const AuthorizationPage = ({activeCity, onSubmit, isAuthorized}) => {
  const [isRequestFailed, setIsRequestFailed] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const onLoginFail = () => setIsRequestFailed(true);
  const onLoginSuccess = () => browserHistory.goBack();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({
      email: emailRef.current.value,
      password: passwordRef.current.value
    }, onLoginSuccess, onLoginFail);
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
          <form className="login__form form" action="#" method="post">
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input ref={emailRef} className="login__input form__input" type="email" name="email" placeholder="Email" required=""/>
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required=""/>
            </div>
            <button onClick={handleSubmit} className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" to={`/cities/${activeCity}`}>
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
  onSubmit(authData, onLoginSuccess, onLoginFailCb) {
    dispatch(authorize(authData, onLoginSuccess, onLoginFailCb));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationPage);
