
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import UserEditPage from './views/UserEditPage.jsx';
import UserQueryPage from './views/UserQueryPage.jsx' ;
import HightOrderContainer from './other/hight-order.js' ; 
import Tabs from './components/tabs.jsx' ;
import HelloComp from './components/HelloComp.jsx' ;


ReactDOM.render(
  <UserEditPage />,
  document.getElementById('app')
);


