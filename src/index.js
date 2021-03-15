import React from "react";
import {Router} from "react-router-dom";
import ReactDom from "react-dom";

import {Provider} from "react-redux";
import store from './store/store';
import {checkAuth} from './store/api-actions';
import history from './browser-history';


import App from './components/app/app';

store.dispatch(checkAuth());

ReactDom.render(
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>,
    document.querySelector(`#root`)
);
