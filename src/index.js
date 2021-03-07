import React from "react";
import ReactDom from "react-dom";

import {Provider} from "react-redux";
import store from './store/store';
import {checkAuth} from './store/api-actions';

import App from './components/app/app';

store.dispatch(checkAuth());

ReactDom.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
