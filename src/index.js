import React from "react";
import ReactDom from "react-dom";

import {createStore} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from 'redux-devtools-extension';

import reducer from './store/reducers/reducer';

import App from './components/app/app';

const store = createStore(reducer, composeWithDevTools());

ReactDom.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
