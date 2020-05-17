import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from "./redux/store/configureStore";
import { Provider } from "react-redux";
import { AppRouter } from "./router/AppRouter";
import 'normalize.css/normalize.css'
import './styles/styles.scss';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));