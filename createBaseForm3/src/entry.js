
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Perf from 'react-addons-perf' ; // ES6
//引入组件
import 'bootstrap/dist/css/bootstrap.css' ;
import './styles/jquery_ui.datepicker-modify.css';
import './styles/jquery-ui-timepicker-addon.css' ;
import './styles/app.scss' ;
import './lib/tui-core/index.js' ;
import './lib/tui-drag/index.js' ;
import './lib/jq-datepicker/index.js' ;
import EditPageDemo from './views/EidtPageDemo.jsx' ;
import QueryPageDemo from './views/QueryPageDemo.jsx' ;
let ShowView = QueryPageDemo ;
ShowView = EditPageDemo ;

window.Perf = Perf ;

ReactDOM.render(
  <ShowView/>,
  document.getElementById('app')
);

