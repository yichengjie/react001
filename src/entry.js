
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import UserEditPage from './views/UserEditPage.jsx';
import UserQueryPage from './views/UserQueryPage.jsx' ;
import HightOrderContainer from './other/hight-order.js' ; 
import Tabs from './other/tabs.jsx' ;



ReactDOM.render(
  <HightOrderContainer />,
  document.getElementById('app')
);


