
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import Demo006Form from './views/Demo006Form.jsx' ;
import 'bootstrap/dist/css/bootstrap.css' ;
import './styles/jquery_ui.datepicker-modify.css';
import './styles/jquery-ui-timepicker-addon.css' ;
import './lib/tui-core/index.js' ;
import './lib/tui-drag/index.js' ;
import './lib/jq-datepicker/index.js' ;
ReactDOM.render(
  <Demo006Form/>,
  document.getElementById('app')
);


