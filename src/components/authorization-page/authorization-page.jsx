import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";

import {getActiveCity} from "../../store/reducers/work-process/selectors";
import {getAuthStatus} from "../../store/reducers/user/selectors";

import browserHistory from '../../browser-history';
import {Routes} from '../../const';
import {authorize} from '../../store/api-actions';

const AuthorizationPage = () => {
  const [isRequestFailed, setIsRequestFailed] = useState(false);
  const [formData, setFormdata] = useState({
    email: ``,
    password: ``
  });

  const activeCity = useSelector(getActiveCity);
  const isAuthorized = useSelector(getAuthStatus);
  const dispatch = useDispatch();

  const onLoginFail = () => setIsRequestFailed(true);
  const onLoginSuccess = () => browserHistory.goBack();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(authorize({
      email: formData.email,
      password: formData.password
    }, onLoginSuccess, onLoginFail));
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
            <Link className="locations__item-link" to={`${Routes.CITIES}/${activeCity}`}>
              <span>{activeCity}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AuthorizationPage;
