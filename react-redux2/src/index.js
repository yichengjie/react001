
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import { Provider } from './react-redux/index.js';
import store from './redux/store.js' ;
import App from './containers/App.js' ;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);