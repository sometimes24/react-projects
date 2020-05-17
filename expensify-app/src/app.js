import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from "./redux/store/configureStore";
import { Provider } from "react-redux";
import { AppRouter } from "./router/AppRouter";
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import { addExpense } from "./redux/actions/expenses";

const store = configureStore();

store.dispatch(addExpense({ description: "Water Bill", amount: 2000 }));
store.dispatch(addExpense({ description: "Gas Bill", amount: 7600, createdAt: 200 }));
store.dispatch(addExpense({ description: "Rent", amount: 109500 }));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));