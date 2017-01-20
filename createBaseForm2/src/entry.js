
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import 'bootstrap/dist/css/bootstrap.css' ;
import './styles/jquery_ui.datepicker-modify.css';
import './styles/jquery-ui-timepicker-addon.css' ;
import './styles/app.scss' ;
import './lib/tui-core/index.js' ;
import './lib/tui-drag/index.js' ;
import './lib/jq-datepicker/index.js' ;
//import EditPageDemo from './views/EidtPageDemo.jsx' ;
import QueryPageDemo from './views/QueryPageDemo.jsx' ;

ReactDOM.render(
  <QueryPageDemo/>,
  document.getElementById('app')
);

