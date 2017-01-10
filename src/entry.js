
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import UserEditPage from './views/UserEditPage.jsx';
import UserQueryPage from './views/UserQueryPage.jsx' ;

ReactDOM.render(
  <UserQueryPage/>,
  document.getElementById('app')
);


