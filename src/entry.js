
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import UserEditPage from './views/UserEditPage.jsx';
import UserQueryPage from './views/UserQueryPage.jsx' ;
//import HelloContainer from './other/hight-order.js' ; 



ReactDOM.render(
  <UserQueryPage  />,
  document.getElementById('app')
);


