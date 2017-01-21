
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import HelloComp from './views/Hello.jsx' ;
import TabDemo from './components/tabs/App.jsx' ;
let ShowView = TabDemo ;

ReactDOM.render(
  <ShowView />,
  document.getElementById('app')
);


